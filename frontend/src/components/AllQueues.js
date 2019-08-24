import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/styles"
import { Tabs, Tab, Typography, Button } from "@material-ui/core"
import QueueTable from "./QueueTable"
import PersonIcon from "@material-ui/icons/Person"
import TimelapseIcon from "@material-ui/icons/Timelapse"
import { QueueStoreContext } from "../stores/QueueStore"

//import { toJS } from "mobx"
//import {
//  caseManagementQueueData,
//  legalServicesQueueData,
//  stepQueueData,
//} from "../../fixtures/MockQueueData"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  queueTabStat: {
    margin: theme.typography.pxToRem(5),
    display: "inline-flex",
    alignItems: "flex-end",
  },
  queueTabStatValue: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: theme.typography.fontWeightLight,
  },
  queueTabContent: {
    display: "flex",
  },
  queueTab: {
    flexGrow: 1,
  },
}))

const QueueTabContent = React.forwardRef(({ onClick, queueData }, _ref) => {
  const classes = useStyles()
  return (
    <Button onClick={onClick} className={classes.queueTab}>
      <div>
        <Typography className={classes.heading}>{queueData.name}</Typography>
        <div className={classes.queueTabContent}>
          <div className={classes.queueTabStat}>
            <PersonIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueData.length}
            </Typography>
          </div>
          <div className={classes.queueTabStat}>
            <TimelapseIcon className={classes.queueTabIcon} />
            <Typography className={classes.queueTabStatValue}>
              {queueData.waitTime}
            </Typography>
          </div>
        </div>
      </div>
    </Button>
  )
})

QueueTabContent.displayName = "QueueTabContent"

QueueTabContent.propTypes = {
  onClick: PropTypes.func,
  queueData: PropTypes.object,
}

function QueueTab(props) {
  return (
    <Tab
      component={QueueTabContent}
      onClick={event => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const AllQueues = observer(() => {
  const queueStore = useContext(QueueStoreContext)

  //Mismatch with fake data ???
  queueStore.updateQueue("1")
  queueStore.updateQueue("2")
  queueStore.updateQueue("3")

  //These do not match ???
  //Pull in data from backend
  const caseQueue = queueStore.needleExchangeQueue
  const legalQueue = queueStore.legalServiceQueue
  const stepQueue = queueStore.stepQueue

  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <QueueTab
          className={classes.queueTab}
          queueData={queueStore.mapQueueToData(caseQueue)}
        />
        <QueueTab
          className={classes.queueTab}
          queueData={queueStore.mapQueueToData(legalQueue)}
        />
        <QueueTab
          className={classes.queueTab}
          queueData={queueStore.mapQueueToData(stepQueue)}
        />
      </Tabs>
      {value === 0 && (
        <QueueTable queueData={queueStore.mapQueueToData(caseQueue)} />
      )}
      {value === 1 && (
        <QueueTable queueData={queueStore.mapQueueToData(legalQueue)} />
      )}
      {value === 2 && (
        <QueueTable queueData={queueStore.mapQueueToData(stepQueue)} />
      )}
    </div>
  )
})

AllQueues.propTypes = {
  queueData: PropTypes.array,
  classes: PropTypes.object,
}

export default AllQueues
