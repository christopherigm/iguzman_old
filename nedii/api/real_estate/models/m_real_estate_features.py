from django.db import models
from common.models import CommonFields

class RealEstateFeature(CommonFields):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False,
        unique=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Caracteristica del inmueble"
        verbose_name_plural="Caracteristicas de los inmuebles"

    class JSONAPIMeta:
        resource_name="RealEstateFeature"
