# Generated by Django 3.1.5 on 2021-08-03 07:31

import common.models.picture
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import meals.models.meal
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stands', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture)),
                ('publish_on_the_wall', models.BooleanField(default=False, verbose_name='Publicar en el muro')),
                ('stock', models.PositiveSmallIntegerField(blank=True, default=1, help_text='Cantidad que existe en stock', null=True, verbose_name='Cantidad en Stock')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('is_meal', models.BooleanField(default=True, verbose_name='Es comida')),
                ('is_dinner', models.BooleanField(default=False, verbose_name='Es cena')),
                ('is_breakfast', models.BooleanField(default=False, verbose_name='Es desayuno')),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('title', models.CharField(max_length=64)),
                ('description', tinymce.models.HTMLField(blank=True, null=True, verbose_name='Descripción')),
                ('short_description', models.CharField(blank=True, help_text='Descripción corta (90 carácteres)', max_length=90, null=True, verbose_name='Descripción corta')),
                ('price', models.DecimalField(decimal_places=2, default=5, help_text='Precio del platillo', max_digits=10, verbose_name='Precio del platillo')),
                ('discount', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Descuento de 1% a 99%', null=True, verbose_name='Descuento')),
                ('final_price', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Precio final')),
                ('times_selled', models.PositiveSmallIntegerField(blank=True, default=0, verbose_name='Cantidad de veces vendido')),
                ('views', models.PositiveSmallIntegerField(blank=True, default=0, verbose_name='Cantidad de veces visto')),
                ('img_thumbnail', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', help_text='Imágen del listado', keep_meta=True, null=True, quality=85, size=[256, 256], upload_to=meals.models.meal.meal_picture, verbose_name='Imágen del listado')),
                ('video_link', models.URLField(blank=True, help_text='Link del vídeo de youtube', null=True, verbose_name='Link del vídeo')),
            ],
            options={
                'verbose_name': 'Platillo',
                'verbose_name_plural': 'Platillos',
            },
        ),
        migrations.CreateModel(
            name='MealClassification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture)),
                ('title', models.CharField(max_length=64)),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('img_icon', models.CharField(blank=True, max_length=128, null=True, verbose_name='Icono')),
            ],
            options={
                'verbose_name': 'Categoría de comida',
                'verbose_name_plural': 'Categorías de comidas',
            },
        ),
        migrations.CreateModel(
            name='MealPicture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('title', models.CharField(blank=True, max_length=64, null=True)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture)),
                ('meal', models.ForeignKey(help_text='Platillo al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='meals.meal', verbose_name='Platillo')),
                ('stand', models.ForeignKey(help_text='Restaurante al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Restaurante')),
            ],
            options={
                'verbose_name': 'Foto de comida',
                'verbose_name_plural': 'Fotos de comidas',
            },
        ),
        migrations.CreateModel(
            name='MealAddon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[256, 256], upload_to=common.models.picture.picture)),
                ('title', models.CharField(max_length=64)),
                ('quantity', models.CharField(blank=True, default='1', max_length=32, verbose_name='Cantidad')),
                ('price', models.DecimalField(decimal_places=2, default=5, max_digits=10, verbose_name='Precio')),
                ('stand', models.ForeignKey(help_text='Restaurante al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Restaurante')),
            ],
            options={
                'verbose_name': 'Ingrediente / adicional',
                'verbose_name_plural': 'Ingredientes / adicionales',
            },
        ),
        migrations.AddField(
            model_name='meal',
            name='classification',
            field=models.ForeignKey(help_text='Clasificación al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='meals.mealclassification', verbose_name='Clasificación'),
        ),
        migrations.AddField(
            model_name='meal',
            name='meal_addons',
            field=models.ManyToManyField(blank=True, help_text='Ingredientes / Adicionales', to='meals.MealAddon', verbose_name='Adicionales'),
        ),
        migrations.AddField(
            model_name='meal',
            name='meal_pictures',
            field=models.ManyToManyField(blank=True, help_text='Fotos del platillo', related_name='meal_pictures', to='meals.MealPicture', verbose_name='Fotos'),
        ),
        migrations.AddField(
            model_name='meal',
            name='stand',
            field=models.ForeignKey(help_text='Restaurante al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Restaurante'),
        ),
    ]
