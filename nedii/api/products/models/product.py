from django.db import models
from common.models import RegularPicture
from common.tools import get_unique_slug
from enum import Enum


class States(Enum):
    NEW='new'
    LIKE_NEW='like-new'
    USED='used'


class Product(RegularPicture):
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
        "products.ProductClassification",
        verbose_name="Clasificación",
        null=True,
        blank=False,
        help_text="Clasificación al que pertenece este registro",
        on_delete=models.CASCADE
    )
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_product",
        verbose_name="Empresa",
        null=True,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    publish_on_the_wall=models.BooleanField(
        verbose_name="Publicar en el muro",
        blank=False,
        default=False
    )
    state=models.CharField(
        null=True,
        blank=True,
        max_length=16,
        choices=[(i.value, i.value) for i in States],
        default='new'
    )
    delivery_type=models.ManyToManyField(
        "products.ProductDeliveryType",
        related_name="delivery_type",
        verbose_name="Tipo de entrega",
        blank=True,
        help_text="Tipo de entrega"
    )
    price=models.DecimalField(
        verbose_name="Precio del producto",
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        default=5,
        help_text="Precio del producto"
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
    brand=models.CharField(
        verbose_name="Marca",
        max_length=64,
        null=True,
        blank=True,
        help_text="Marca del producto"
    )
    short_description=models.CharField(
        verbose_name="Descripción corta",
        max_length=90,
        null=True,
        blank=True,
        help_text="Descripción corta (90 carácteres)"
    )
    unlimited_stock=models.BooleanField(
        verbose_name="Stock ilimitado?",
        blank=False,
        default=False
    )
    stock=models.PositiveIntegerField(
        verbose_name="Cantidad de producto",
        null=True,
        blank=True,
        default=0,
        help_text="Cantidad de producto que existe en stock"
    )
    shipping_cost=models.PositiveIntegerField(
        verbose_name="Costo de envío",
        null=True,
        blank=True,
        default=0,
    )
    features=models.ManyToManyField(
        "products.ProductFeatureOption",
        related_name="product_features",
        verbose_name="Caractarísticas del producto",
        blank=True
    )
    product_pictures=models.ManyToManyField(
        "products.ProductPicture",
        related_name="product_pictures",
        verbose_name="Fotos",
        blank=True,
        help_text="Fotos del producto"
    )
    related=models.ManyToManyField(
        "products.Product",
        related_name="related_products",
        verbose_name="Productos relacionados",
        blank=True,
    )
    video_link=models.CharField(
        verbose_name="Link del vídeo",
        max_length=512,
        null=True,
        blank=True,
        help_text="Link del vídeo de youtube"
    )
    support_email=models.EmailField(
        verbose_name="Correo de soporte",
        max_length=128,
        null=True,
        blank=True,
        help_text="Correo electrónico de soporte"
    )
    support_info=models.CharField(
        verbose_name="Información de soporte",
        max_length=256,
        null=True,
        blank=True,
        help_text="Información de soporte"
    )
    support_phone=models.CharField(
        verbose_name="Teléfono de soporte",
        max_length=12,
        null=True,
        blank=True,
        help_text="Teléfono de soporte"
    )
    warranty_days=models.PositiveIntegerField(
        verbose_name="Días de garantía",
        null=False,
        blank=True,
        default=0,
        help_text="Días de garantía del producto"
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
                Product
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

        if self.final_price > self.stand.products_max_price:
            self.stand.products_max_price = self.final_price
            self.stand.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return "{} - {}".format(
            self.stand.name,
            self.name
        )


    class Meta:
        verbose_name="Producto"
        verbose_name_plural="Productos"

    class JSONAPIMeta:
        resource_name="Product"