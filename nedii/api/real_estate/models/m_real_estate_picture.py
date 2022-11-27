from django.db import models
from common.models import MediumPicture

class RealEstatePicture(MediumPicture):
    stand=models.ForeignKey (
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    real_estate=models.ForeignKey(
        "real_estate.RealEstate",
        verbose_name="Inmueble",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    def __str__(self):
        name=self.name or 'picture'
        return "{} - {}".format(
            self.real_estate.name,
            name
        )

    class Meta:
        verbose_name="Foto del inmueble"
        verbose_name_plural="Fotos de los inmuebles"

    class JSONAPIMeta:
        resource_name="RealEstatePicture"
