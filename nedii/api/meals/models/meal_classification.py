from django.db import models
from common.models import MediumPicture
from common.tools import get_unique_slug

class MealClassification(MediumPicture):
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_meal_classification",
        verbose_name="Restaurante",
        null=False,
        blank=False,
        help_text="Restaurante al que pertenece este registro",
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
    img_icon=models.CharField (
        verbose_name="Icono",
        max_length=32,
        null=True,
        blank=True
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(
                self.name,
                MealClassification
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Categoría de comida"
        verbose_name_plural="Categorías de comidas"

    class JSONAPIMeta:
        resource_name="MealClassification"
