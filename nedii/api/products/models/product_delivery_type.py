from django.db import models
from common.models import MediumPicture

class ProductDeliveryType(MediumPicture):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    icon=models.CharField (
        verbose_name="Ícono",
        max_length=32,
        null=True,
        blank=True,
        help_text="Ícono"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Tipo de envío"
        verbose_name_plural="Tipos de envíos"

    class JSONAPIMeta:
        resource_name="ProductDeliveryType"