from django.db import models
from django.contrib.auth.models import User
from enum import Enum
from common.models import (
    Address,
    City
)

class AddressType(Enum):
    HOUSE='house'
    APARTMENT='apartment'
    WORK='work'
    MAIL_BOX='mail_box'

class UserAddress(Address):
    user = models.ForeignKey (
        User,
        null = False,
        blank = False,
        on_delete = models.CASCADE
    )
    city = models.ForeignKey (
        City,
        related_name = 'user_city_address',
        null = True,
        blank = True,
        on_delete = models.CASCADE
    )
    address_type=models.CharField(
        null=True,
        blank=True,
        max_length=16,
        choices=[(i.value, i.value) for i in AddressType]
    )
    delivery_instructions=models.CharField (
        max_length=32,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.alias

    class Meta:
        verbose_name = "User address"
        verbose_name_plural = "User address'"

    class JSONAPIMeta:
        resource_name = "UserAddress"
