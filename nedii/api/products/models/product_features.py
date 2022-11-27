from django.db import models
from common.models import CommonFields

class ProductFeature(CommonFields):
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_product_feature",
        verbose_name="Empresa",
        null=False,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False,
        unique=True
    )
    options=models.ManyToManyField(
        "products.ProductFeatureOption",
        related_name="product_feature_options",
        verbose_name="Opciones de caractarísticas del producto",
        blank=True
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Caracteristica del producto"
        verbose_name_plural="Caracteristicas de los productos"

    class JSONAPIMeta:
        resource_name="ProductFeature"


class ProductFeatureOption(CommonFields):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False,
        unique=True
    )
    feature=models.ForeignKey(
        "products.ProductFeature",
        verbose_name="Caracteristica del producto",
        null=False,
        blank=False,
        help_text="Caracteristica del producto",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "{} - {}".format(
            self.feature.name,
            self.name
        )

    class Meta:
        verbose_name="Opcion de caracteristica del producto"
        verbose_name_plural="Opciones de caracteristicas del producto"

    class JSONAPIMeta:
        resource_name="ProductFeatureOption"
