from django.db import models
from common.models import CommonFields
from django.contrib.auth.models import User
from users.models import UserAbstractBuyableItem

class UserOrderBuyableItem(UserAbstractBuyableItem):
    quantity=models.PositiveSmallIntegerField(
        verbose_name="Cantidad",
        null=False,
        blank=False,
        default=1,
        help_text="Cantidad comprada"
    )
    purchase_order = models.ForeignKey(
        "users.UserOrder",
        verbose_name="Orden de compra",
        null=True,
        blank=False,
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = "Elemento de la órden"
        verbose_name_plural = "Elementos de la órden"

    class JSONAPIMeta:
        resource_name = "UserOrderBuyableItem"


class UserOrder(CommonFields):
    user = models.ForeignKey(
        User,
        verbose_name="Usuario",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    address = models.CharField(
        verbose_name="Dirección de entrega",
        null=False,
        blank=False,
        max_length=128
    )
    receptor_name = models.CharField(
        verbose_name="Nombre del receptor",
        null=False,
        blank=False,
        max_length=40,
    )
    phone = models.CharField(
        verbose_name="Teléfono",
        null=False,
        blank=False,
        max_length=10,
    )
    reference = models.CharField(
        verbose_name="Referencia del lugar",
        null=True,
        blank=True,
        max_length=64,
    )
    broker_id = models.CharField(
        verbose_name="Broker ID",
        max_length=64,
        null=False,
        blank=False
    )
    order_items = models.ManyToManyField(
        "users.UserOrderBuyableItem",
        related_name="order_buyable_items",
        verbose_name="Elementos de la órden",
        blank=True
    )
    backup_user_name=models.CharField(
        verbose_name="Nombre del comprador",
        null=False,
        blank=False,
        max_length=64,
    )
    
    def save(self, *args, **kwargs):
        backup_user_name = "{} {}".format(
            self.user.last_name,
            self.user.first_name
        )
        self.backup_user_name = backup_user_name
        super().save(*args, **kwargs)

    def __str__(self):
        return "{0} ({1})".format(self.user,self.broker_id)

    class Meta:
        verbose_name = "Órden de compra"
        verbose_name_plural = "Órdenes de compra"
        unique_together = (("user", "broker_id"),)

    class JSONAPIMeta:
        resource_name = "UserOrder"
