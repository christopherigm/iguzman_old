from django.db import models
from common.models import MediumPicture

class ServicePicture(MediumPicture):
    stand=models.ForeignKey (
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    service=models.ForeignKey(
        "services.Service",
        verbose_name="Servicio",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    def __str__(self):
        name=self.name or 'picture'
        return "{} - {}".format(
            self.service.name,
            name
        )

    class Meta:
        verbose_name="Foto del servicio"
        verbose_name_plural="Fotos de los servicios"

    class JSONAPIMeta:
        resource_name="ServicePicture"
