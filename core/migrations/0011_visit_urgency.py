# Generated by Django 2.2.2 on 2019-09-18 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20190911_0047'),
    ]

    operations = [
        migrations.AddField(
            model_name='visit',
            name='urgency',
            field=models.CharField(default=1, max_length=20),
        ),
    ]
