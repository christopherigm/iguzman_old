from django.db import models
from common.models import CommonFields

class VideoLink(CommonFields):
    stand = models.ForeignKey(
        'stands.Stand',
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    name = models.CharField(
        verbose_name="Titulo del link",
        max_length=128,
        null=True,
        blank=True
    )
    link = models.URLField(
        verbose_name="Link del vídeo",
        max_length=256,
        null=False,
        blank=False
    )

    def __str__(self):
        return '{} {}'.format(
            self.stand.name,
            self.name
        )

    class Meta:
        verbose_name = "Link de vídeo"
        verbose_name_plural = "Links de vídeos"

    class JSONAPIMeta:
        resource_name = "VideoLink"
