from django.db import models
from common.models import MediumPicture

class ProductPicture(MediumPicture):
    stand=models.ForeignKey (
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    product=models.ForeignKey(
        "products.Product",
        verbose_name="Producto",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    def __str__(self):
        name=self.name or 'picture'
        return "{} - {}".format(
            self.product.name,
            name
        )

    class Meta:
        verbose_name="Foto del producto"
        verbose_name_plural="Fotos de los productos"

    class JSONAPIMeta:
        resource_name="ProductPicture"
