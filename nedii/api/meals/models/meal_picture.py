from django.db import models
from common.models import MediumPicture

class MealPicture(MediumPicture):
    stand=models.ForeignKey (
        "stands.Stand",
        verbose_name="Restaurante",
        null=True,
        blank=False,
        help_text="Restaurante al que pertenece este registro",
        on_delete=models.CASCADE
    )
    meal=models.ForeignKey (
        "meals.Meal",
        verbose_name="Platillo",
        null=True,
        blank=False,
        help_text="Platillo al que pertenece este registro",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name or "-"

    def save(self, *args, **kwargs):
        if not self.name:
            self.name="{} - {} image".format(
                self.stand.name,
                self.meal.name
            )

        super().save(*args, **kwargs)

    class Meta:
        verbose_name="Foto de comida"
        verbose_name_plural="Fotos de comidas"

    class JSONAPIMeta:
        resource_name="MealPicture"
