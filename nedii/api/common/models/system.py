from django.db import models
from tinymce.models import HTMLField
from common.models import CommonFields
from common.tools import set_media_url
from django_resized import ResizedImageField

def picture(instance, filename):
    return set_media_url( "CommonPicture", filename)

class System(CommonFields):
    site_name=models.CharField (
        verbose_name="Nombre del sitio",
        max_length=32,
        null=False,
        blank=False,
        default="Nedii",
        help_text="Nombre para mostrar en la pagina principal"
    )
    img_logo=ResizedImageField (
        verbose_name="Logo de Nedii",
        null=True,
        blank=True,
        size=[512, 512],
        quality=95,
        upload_to=picture
    )
    home_pictures=models.ManyToManyField(
        "common.HomePicture",
        related_name="home_pictures",
        verbose_name="Fotos del home",
        blank=True,
        help_text="Fotos del home"
    )
    privacy_policy=HTMLField (
        null=True,
        blank=True,
        default="Politica de privacidad"
    )
    terms_and_conditions=HTMLField (
        null=True,
        blank=True,
        default="Terminos y condiciones"
    )
    user_data=HTMLField (
        null=True,
        blank=True,
        default="Datos de usuario"
    )

    def __str__(self):
        return self.site_name

    class JSONAPIMeta:
        resource_name="System"
