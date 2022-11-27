from django.db import models
from common.models import MediumPicture
from common.tools import get_unique_slug

class StandPromotion(MediumPicture):
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
    stand=models.ForeignKey(
        "stands.Stand",
        related_name="stand_deal",
        verbose_name="Empresa",
        null=False,
        blank=False,
        help_text="Empresa al que pertenece este registro",
        on_delete=models.CASCADE
    )
    product=models.ForeignKey(
        "products.Product",
        related_name="product_deal",
        verbose_name="Producto",
        null=True,
        blank=True,
        help_text="Producto de la promoción",
        on_delete=models.CASCADE
    )
    service=models.ForeignKey(
        "services.Service",
        related_name="service_deal",
        verbose_name="Servicio",
        blank=True,
        null=True,
        help_text="Servicio de la promoción",
        on_delete=models.CASCADE
    )
    meal=models.ForeignKey(
        "meals.Meal",
        related_name="meal_deal",
        verbose_name="Platillo",
        blank=True,
        null=True,
        help_text="Platillo de la promoción",
        on_delete=models.CASCADE
    )
    real_estate=models.ForeignKey(
        "real_estate.RealEstate",
        related_name="real_estate_deal",
        verbose_name="Inmueble",
        blank=True,
        null=True,
        help_text="Inmueble de la promoción",
        on_delete=models.CASCADE
    )
    vehicle=models.ForeignKey(
        "vehicles.Vehicle",
        related_name="vehicle_deal",
        verbose_name="Vehículo",
        blank=True,
        null=True,
        help_text="Vehículo de la promoción",
        on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug=get_unique_slug(
                "{} {}".format(
                    self.stand.name,
                    self.name
                ),
                StandPromotion
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name="Promoción de Stand"
        verbose_name_plural="Promociones de Stands"

    class JSONAPIMeta:
        resource_name="StandPromotion"
