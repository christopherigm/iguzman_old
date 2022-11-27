from django.db import models
from tinymce.models import HTMLField
from django_resized import ResizedImageField
from common.models import MediumPicture
from common.tools import set_media_url, get_unique_slug

def meal_picture(instance, filename):
    return set_media_url("meal_picture/", filename)

class Meal(MediumPicture):
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
    classification=models.ForeignKey(
        "meals.MealClassification",
        verbose_name="Clasificación",
        null=True,
        blank=False,
        help_text="Clasificación al que pertenece este registro",
        on_delete=models.CASCADE
    )
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_meal",
        verbose_name="Restaurante",
        null=True,
        blank=False,
        help_text="Restaurante al que pertenece este registro",
        on_delete=models.CASCADE
    )
    publish_on_the_wall=models.BooleanField(
        verbose_name="Publicar en el muro",
        blank=False,
        default=False
    )
    stock=models.PositiveSmallIntegerField(
        verbose_name="Cantidad en Stock",
        null=True,
        blank=True,
        default=1,
        help_text="Cantidad que existe en stock"
    )
    is_breakfast=models.BooleanField(
        verbose_name="Es desayuno",
        blank=False,
        default=False
    )
    is_meal=models.BooleanField(
        verbose_name="Es comida",
        blank=False,
        default=True
    )
    is_dinner=models.BooleanField(
        verbose_name="Es cena",
        blank=False,
        default=False
    )
    short_description=models.CharField(
        verbose_name="Descripción corta",
        max_length=90,
        null=True,
        blank=True,
        help_text="Descripción corta (90 carácteres)"
    )
    description=HTMLField(
        verbose_name="Descripción",
        null=True,
        blank=True,
        default="Descripcion del platillo"
    )
    price=models.DecimalField(
        verbose_name="Precio del platillo",
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        default=5,
        help_text="Precio del platillo"
    )
    discount=models.PositiveSmallIntegerField(
        verbose_name="Descuento",
        null=True,
        blank=True,
        default=0,
        help_text="Descuento de 1% a 99%"
    )
    final_price=models.DecimalField(
        verbose_name="Precio final",
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True,
        default=0
    )
    meal_addons=models.ManyToManyField(
        "meals.MealAddon",
        verbose_name="Adicionales",
        blank=True,
        help_text="Ingredientes / Adicionales"
    )
    meal_pictures=models.ManyToManyField(
        "meals.MealPicture",
        related_name="meal_pictures",
        verbose_name="Fotos",
        blank=True,
        help_text="Fotos del platillo"
    )
    video_link=models.URLField(
        verbose_name="Link del vídeo",
        null=True,
        blank=True,
        help_text="Link del vídeo de youtube"
    )
    times_selled=models.PositiveSmallIntegerField(
        verbose_name="Cantidad de veces vendido",
        null=False,
        blank=True,
        default=0
    )
    views=models.PositiveSmallIntegerField(
        verbose_name="Cantidad de veces visto",
        null=False,
        blank=True,
        default=0
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(
                "{}-{}".format(
                    self.stand.slug,
                    self.name
                ),
                Meal
            )

        final_price=float(self.price)

        discount=0
        if self.discount is not None:
            discount=int(self.discount)

        if 99 > discount > 0:
            discount=discount / 100
            discount=discount * final_price
            final_price -= discount

        self.final_price=final_price

        if self.final_price > self.stand.meals_max_price:
            self.stand.meals_max_price = self.final_price
            self.stand.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return "{} - {}".format(
            self.stand.name,
            self.name
        )

    class Meta:
        verbose_name="Platillo"
        verbose_name_plural="Platillos"

    class JSONAPIMeta:
        resource_name="Meal"
