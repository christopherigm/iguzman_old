from django.db import models
from common.models import SmallPicture

class MealAddon(SmallPicture):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_meal_addon",
        verbose_name="Restaurante",
        null=False,
        blank=False,
        help_text="Restaurante al que pertenece este registro",
        on_delete=models.CASCADE
    )
    quantity=models.CharField(
        verbose_name="Cantidad",
        max_length=32,
        null=False,
        blank=True,
        default="1"
    )
    price=models.DecimalField(
        verbose_name="Precio",
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        default=5,
    )

    def __str__(self):
        return "[{0}] {1} ${2}".format(
            self.stand,
            self.name,
            self.price
        )

    class Meta:
        verbose_name="Ingrediente / adicional"
        verbose_name_plural="Ingredientes / adicionales"

    class JSONAPIMeta:
        resource_name="MealAddOn"
