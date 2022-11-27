from django.db import models
from common.models import CommonFields
from django.contrib.auth.models import User

class UserAbstractBuyableItem(CommonFields):
    user = models.ForeignKey(
        User,
        verbose_name="Usuario",
        null=False,
        blank=False,
        on_delete=models.CASCADE
    )
    product=models.ForeignKey(
        "products.Product",
        verbose_name="Producto",
        null=True,
        blank=True,
        help_text="Producto de la promoción",
        on_delete=models.CASCADE
    )
    service=models.ForeignKey(
        "services.Service",
        verbose_name="Servicio",
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    meal=models.ForeignKey(
        "meals.Meal",
        verbose_name="Platillo",
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    real_estate=models.ForeignKey(
        "real_estate.RealEstate",
        verbose_name="Inmueble",
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    vehicle=models.ForeignKey(
        "vehicles.Vehicle",
        verbose_name="Vehículo",
        blank=True,
        null=True,
        on_delete=models.CASCADE
    )
    meal_addons=models.ManyToManyField(
        "meals.MealAddon",
        verbose_name="Adicionales",
        blank=True,
        help_text="Ingredientes / Adicionales"
    )
    backup_name=models.CharField(
        verbose_name="Nombre de elemento comprado",
        null=False,
        blank=False,
        max_length=64,
    )
    backup_user_name=models.CharField(
        verbose_name="Nombre del comprador",
        null=False,
        blank=False,
        max_length=64,
    )
    backup_final_price=models.DecimalField(
        verbose_name="Precio final",
        max_digits=10,
        decimal_places=2,
        null=False,
        blank=False,
        default=0
    )

    def __str__(self):
        name = ''
        if self.product is not None:
            name = self.product.name
        if self.service is not None:
            name = self.service.name
        if self.meal is not None:
            name = self.meal.name
        if self.real_estate is not None:
            name = self.real_estate.name
        if self.vehicle is not None:
            name = "{} {} {}".format(
                self.vehicle.model.make.name,
                self.vehicle.model.name,
                self.vehicle.year,
            )
        return name

    def save(self, *args, **kwargs):
        name = ''
        if self.product is not None:
            name = self.product.name
        if self.service is not None:
            name = self.service.name
        if self.meal is not None:
            name = self.meal.name
        if self.real_estate is not None:
            name = self.real_estate.name
        if self.vehicle is not None:
            name = "{} {} {}".format(
                self.vehicle.model.make.name,
                self.vehicle.model.name,
                self.vehicle.year,
            )
        self.backup_name = name

        final_price = 0
        if self.product is not None:
            final_price = self.product.final_price
        if self.service is not None:
            final_price = self.service.final_price
        if self.meal is not None:
            final_price = self.meal.final_price
        if self.real_estate is not None:
            final_price = self.real_estate.final_price
        if self.vehicle is not None:
            final_price = self.vehicle.final_price
        self.backup_final_price = final_price

        backup_user_name = "{} {}".format(
            self.user.last_name,
            self.user.first_name
        )
        self.backup_user_name = backup_user_name

        super().save(*args, **kwargs)

    class Meta:
        abstract=True
