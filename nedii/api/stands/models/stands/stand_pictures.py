from django.db import models
from common.models import MediumPicture

class StandPictures(MediumPicture):
    stand = models.ForeignKey(
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name or "-"

    def save(self, *args, **kwargs):
        if not self.name:
            self.name="{} - image".format(
                self.stand.name
            )

        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Foto de la empresa"
        verbose_name_plural = "Fotos de la empresa"

    class JSONAPIMeta:
        resource_name = "StandPicture"

