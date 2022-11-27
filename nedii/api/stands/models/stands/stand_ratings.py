from django.db import models
from common.models import CommonFields
from django.contrib.auth.models import User
from tinymce.models import HTMLField

class StandRating(CommonFields):
    stand = models.ForeignKey(
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        User,
        verbose_name="Autor",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    rating = models.PositiveSmallIntegerField(
        null=False,
        blank=False,
        default=5
    )
    description=HTMLField(
        verbose_name="Comentario adicional",
        null=True,
        blank=True
    )

    def __str__(self):
        return "{} dio {} estrellas a {}".format(
            self.author.username,
            str(self.rating),
            self.stand.name
        )

    class Meta:
        verbose_name = "Puntuación"
        verbose_name_plural = "Puntuaciones"
        unique_together = (('stand', 'author'),)

    class JSONAPIMeta:
        resource_name = "StandRating"
