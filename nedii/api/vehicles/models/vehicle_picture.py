from django.db import models
from common.models import MediumPicture

class VehiclePicture(MediumPicture):
    stand=models.ForeignKey (
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    vehicle=models.ForeignKey(
        "vehicles.Vehicle",
        verbose_name="Vehiculo",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    def __str__(self):
        name=self.name or 'picture'
        return "{} - {}".format(
            self.vehicle.name,
            name
        )

    class Meta:
        verbose_name="Foto del vehiculo"
        verbose_name_plural="Fotos de los vehiculos"

    class JSONAPIMeta:
        resource_name="VehiclePicture"
