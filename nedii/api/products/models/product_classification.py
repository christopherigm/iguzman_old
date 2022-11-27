from django.db import models
from common.models import MediumPicture
from common.tools import get_unique_slug

class ProductClassification(MediumPicture):
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_product_classification",
        verbose_name="Empresa",
        null=False,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    slug=models.SlugField (
        max_length=64,
        null=True,
        blank=True,
        unique=True
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(
                self.name,
                ProductClassification
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Categoría de producto"
        verbose_name_plural="Categorías de productos"

    class JSONAPIMeta:
        resource_name="ProductClassification"
