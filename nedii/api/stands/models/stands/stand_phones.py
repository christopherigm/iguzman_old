from django.db import models
from common.models import CommonFields

class StandPhones(CommonFields):
    stand = models.ForeignKey(
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    phone = models.CharField(
        verbose_name="Teléfono",
        max_length=10,
        null=False,
        blank=False,
        help_text="Teléfono de la empresa"
    )

    def __str__(self):
        return "{} {}".format(
            self.stand.name,
            self.phone
        )

    class Meta:
        verbose_name = "Teléfono de Stand"
        verbose_name_plural = "Teléfonos de los Stands"

    class JSONAPIMeta:
        resource_name = "StandPhone"

