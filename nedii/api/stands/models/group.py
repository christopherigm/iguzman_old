from django.db import models
from common.tools import get_unique_slug
from common.models import RegularPicture
from colorfield.fields import ColorField

class Group(RegularPicture):
    name=models.CharField (
        max_length=64,
        null=False,
        blank=False
    )
    slug=models.SlugField(
        max_length=64,
        null=True,
        blank=True,
        unique=True
    )
    icon=models.CharField (
        null=True,
        blank=True,
        max_length=32
    )
    color=ColorField(
        null=True,
        blank=True,
        default="#42a5f5"
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(self.name, Group)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name="Pabellon"
        verbose_name_plural="Pabellones"

    class JSONAPIMeta:
        resource_name="Group"
