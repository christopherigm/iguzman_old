import uuid
from django.db import models
from tinymce.models import HTMLField
from django.contrib.auth.models import User
from django_resized import ResizedImageField
from common.tools import set_media_url
from common.models import CommonFields

languages = (
    ('EN', 'English'),
    ('ES', 'Español')
)

def picture(instance, filename):
    return set_media_url('profile', filename)

class UserProfile(CommonFields):
    user = models.ForeignKey (
        User,
        null = False,
        blank = False,
        on_delete = models.CASCADE
    )
    token = models.UUIDField (
        null = True,
        blank = True,
        default=uuid.uuid4
    )
    img_picture = ResizedImageField (
        null=True,
        blank=True,
        size=[512, 512],
        quality=90,
        upload_to=picture
    )
    is_seller = models.BooleanField (
        verbose_name="Es expsitor?",
        default=False,
        blank=False,
        null=False
    )
    newsletter = models.BooleanField (
        verbose_name="Newsletter activado?",
        default=False,
        blank=False,
        null=False
    )
    promotions = models.BooleanField (
        verbose_name="Promociones activadas?",
        default=False,
        blank=False,
        null=False
    )
    biography = HTMLField(
        null=True,
        blank=True,
        default="Biografia del expositor"
    )
    owner_position=models.CharField(
        verbose_name="Puesto de Expositor",
        max_length=32,
        null=True,
        blank=True
    )
    owner_position_description=HTMLField(
        verbose_name="Descripción del puesto",
        null=True,
        blank=True,
        default="Descripción del puesto"
    )
    owner_phone=models.CharField(
        verbose_name="Teléfono de Expositor",
        max_length=10,
        null=True,
        blank=True
    )
    owner_office_phone=models.CharField(
        verbose_name="Teléfono de oficina de Expositor",
        max_length=10,
        null=True,
        blank=True
    )
    owner_email=models.EmailField(
        verbose_name="Email de Expositor",
        max_length=256,
        null=True,
        blank=True
    )
    owner_whatsapp=models.CharField(
        verbose_name="Whats App de Expositor",
        max_length=14,
        null=True,
        blank=True
    )
    owner_address=models.CharField(
        verbose_name="Dirección de Expositor",
        max_length=256,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.first_name

    class Meta:
        verbose_name = "User profile"
        verbose_name_plural = "User profiles"

    class JSONAPIMeta:
        resource_name = "UserProfile"
