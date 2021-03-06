from core.viewsets import ModelViewSet
from core.models import Service
from core.services.serializers import ServiceSerializer
from core.permissions import FRONT_DESK, CASE_MANAGER, ADMIN

class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_groups = {
        'retrieve': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'list': [FRONT_DESK, CASE_MANAGER, ADMIN],
        'update': [FRONT_DESK, CASE_MANAGER, ADMIN]
    }

