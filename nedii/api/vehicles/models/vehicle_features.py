from django.db import models
from common.models import CommonFields

class VehicleFeature(CommonFields):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False,
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Caracteristica del vehiculo"
        verbose_name_plural="Caracteristicas de los vehiculos"

    class JSONAPIMeta:
        resource_name="VehicleFeature"
