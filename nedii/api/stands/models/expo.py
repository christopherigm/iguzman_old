from django.db import models
from common.tools import get_unique_slug
from common.models import RegularPicture

class Expo(RegularPicture):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    real=models.BooleanField(
        verbose_name="Expo Física",
        blank=False,
        default=False,
        help_text="Define si es una exposición física"
    )
    email=models.EmailField(
        verbose_name="Correo electrónico",
        max_length=128,
        null=False,
        blank=False,
        help_text="Correo electrónico del responsable"
    )
    slug=models.SlugField(
        max_length=64,
        null=True,
        blank=True,
        unique=True
    )
    groups=models.ManyToManyField(
        "stands.Group",
        related_name="expo_groups",
        verbose_name="Grupos",
        blank=True,
        help_text="Grupos de esta expo"
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(self.name, Expo)
        super().save(*args, **kwargs)

    def __str__(self):
        if self.real:
            return "Expo física: {0}".format(self.name)
        else:
            return "Expo virtual: {0}".format(self.name)

    class Meta:
        verbose_name="Expo"
        verbose_name_plural="Expos"

    class JSONAPIMeta:
        resource_name="Expo"
