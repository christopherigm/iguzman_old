from django.db import models
from common.models import RegularPicture
from common.tools import set_media_url, get_unique_slug

def stand_new(instance, filename):
    return set_media_url("stand_new/", filename)

class StandNews(RegularPicture):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    stand = models.ForeignKey(
        "stands.Stand",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    slug = models.SlugField(
        max_length=64,
        null=True,
        blank=True,
        unique=True
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = get_unique_slug(
                "{} {}".format(
                    self.stand.name,
                    self.name
                ),
                StandNews
            )
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Noticia de Stand"
        verbose_name_plural = "Noticias de Stands"

    class JSONAPIMeta:
        resource_name = "StandNew"

