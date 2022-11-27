# Generated by Django 3.2.7 on 2022-02-11 06:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0006_alter_vehicle_stand'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('meals', '0011_auto_20220205_1157'),
        ('stands', '0029_stand_average_rating'),
        ('services', '0004_auto_20220205_1157'),
        ('products', '0018_auto_20220205_1157'),
        ('real_estate', '0004_alter_realestate_stand'),
        ('users', '0006_auto_20220120_0028'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserOrderBuyableItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('backup_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_user_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_final_price', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Precio final')),
                ('quantity', models.PositiveSmallIntegerField(default=1, help_text='Cantidad comprada', verbose_name='Cantidad')),
                ('meal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='meals.meal', verbose_name='Platillo')),
                ('meal_addons', models.ManyToManyField(blank=True, help_text='Ingredientes / Adicionales', to='meals.MealAddon', verbose_name='Adicionales')),
                ('product', models.ForeignKey(blank=True, help_text='Producto de la promoción', null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='Producto')),
                ('real_estate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='real_estate.realestate', verbose_name='Inmueble')),
                ('service', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Servicio')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vehicles.vehicle', verbose_name='Vehículo')),
            ],
            options={
                'verbose_name': 'Elemento de la órden',
                'verbose_name_plural': 'Elementos de la órden',
            },
        ),
        migrations.CreateModel(
            name='UserOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('address', models.CharField(max_length=128, verbose_name='Dirección de entrega')),
                ('receptor_name', models.CharField(max_length=40, verbose_name='Nombre del receptor')),
                ('phone', models.CharField(max_length=10, verbose_name='Teléfono')),
                ('reference', models.CharField(max_length=64, verbose_name='Nombre del receptor')),
                ('broker_id', models.CharField(blank=True, max_length=64, null=True, verbose_name='Broker ID')),
                ('order_items', models.ManyToManyField(blank=True, related_name='order_buyable_items', to='users.UserOrderBuyableItem', verbose_name='Elementos de la órden')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Órden de compra',
                'verbose_name_plural': 'Órdenes de compra',
            },
        ),
        migrations.CreateModel(
            name='UserFavoriteBuyableItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('backup_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_user_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_final_price', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Precio final')),
                ('meal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='meals.meal', verbose_name='Platillo')),
                ('meal_addons', models.ManyToManyField(blank=True, help_text='Ingredientes / Adicionales', to='meals.MealAddon', verbose_name='Adicionales')),
                ('product', models.ForeignKey(blank=True, help_text='Producto de la promoción', null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='Producto')),
                ('real_estate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='real_estate.realestate', verbose_name='Inmueble')),
                ('service', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Servicio')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vehicles.vehicle', verbose_name='Vehículo')),
            ],
            options={
                'verbose_name': 'Elemento de compra favorito',
                'verbose_name_plural': 'Elementos de compra favoritos',
            },
        ),
        migrations.CreateModel(
            name='UserCartBuyableItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('backup_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_user_name', models.CharField(max_length=64, verbose_name='Nombre de elemento comprado')),
                ('backup_final_price', models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Precio final')),
                ('quantity', models.PositiveSmallIntegerField(default=1, help_text='Cantidad comprada', verbose_name='Cantidad')),
                ('meal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='meals.meal', verbose_name='Platillo')),
                ('meal_addons', models.ManyToManyField(blank=True, help_text='Ingredientes / Adicionales', to='meals.MealAddon', verbose_name='Adicionales')),
                ('product', models.ForeignKey(blank=True, help_text='Producto de la promoción', null=True, on_delete=django.db.models.deletion.CASCADE, to='products.product', verbose_name='Producto')),
                ('real_estate', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='real_estate.realestate', verbose_name='Inmueble')),
                ('service', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='services.service', verbose_name='Servicio')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
                ('vehicle', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='vehicles.vehicle', verbose_name='Vehículo')),
            ],
            options={
                'verbose_name': 'Stands favorito',
                'verbose_name_plural': 'Stands favoritos',
            },
        ),
        migrations.CreateModel(
            name='UserFavoriteStands',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('stand', models.ForeignKey(help_text='Empresa al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Empresa')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario')),
            ],
            options={
                'verbose_name': 'Stands favorito',
                'verbose_name_plural': 'Stands favoritos',
                'unique_together': {('stand', 'user')},
            },
        ),
    ]