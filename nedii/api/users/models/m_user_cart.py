from django.db import models
from users.models import UserAbstractBuyableItem

class UserCartBuyableItems(UserAbstractBuyableItem):
    quantity=models.PositiveSmallIntegerField(
        verbose_name="Cantidad",
        null=False,
        blank=False,
        default=1,
        help_text="Cantidad comprada"
    )

    class Meta:
        verbose_name = "Carrito de compras"
        verbose_name_plural = "Carritos de compras"
        unique_together = [
            ("user", "product"),
            ("user", "service"),
            ("user", "meal"),
            ("user", "real_estate"),
            ("user", "vehicle"),
        ]

    class JSONAPIMeta:
        resource_name = "UserCartBuyableItems"
