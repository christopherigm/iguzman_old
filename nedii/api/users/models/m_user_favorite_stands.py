from django.db import models
from common.models import CommonFields
from django.contrib.auth.models import User

class UserFavoriteStands(CommonFields):
    stand = models.ForeignKey(
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        verbose_name="Usuario",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return "{} likes {}".format(
            self.user.first_name,
            self.stand.name
        )

    class Meta:
        verbose_name = "Stands favorito"
        verbose_name_plural = "Stands favoritos"
        unique_together = (('stand', 'user'),)

    class JSONAPIMeta:
        resource_name = "UserFavoriteStands"
