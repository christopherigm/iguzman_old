# Generated by Django 3.2.7 on 2022-01-20 07:28

import common.models.picture
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('stands', '0025_auto_20220120_0028'),
    ]

    operations = [
        migrations.CreateModel(
            name='RealEstate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, default='Descripción', null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[1080, 1080], upload_to=common.models.picture.picture)),
                ('name', models.CharField(max_length=64)),
                ('slug', models.SlugField(max_length=64, unique=True)),
                ('state', models.CharField(blank=True, choices=[('new', 'new'), ('like-new', 'like-new'), ('used', 'used')], default='new', max_length=16, null=True)),
                ('year', models.CharField(blank=True, help_text='Anio del inmueble', max_length=4, null=True, verbose_name='Anio del inmueble')),
                ('area', models.PositiveSmallIntegerField(blank=True, default=60, null=True)),
                ('num_of_bedrooms', models.PositiveSmallIntegerField(blank=True, default=1, null=True)),
                ('num_of_bathrooms', models.PositiveSmallIntegerField(blank=True, default=1, null=True)),
                ('num_of_parking_spots', models.PositiveSmallIntegerField(blank=True, default=1, null=True)),
                ('publish_on_the_wall', models.BooleanField(default=False, verbose_name='Publicar en el muro')),
                ('price', models.DecimalField(decimal_places=2, default=5, help_text='Precio del inmueble', max_digits=10, verbose_name='Precio del inmueble')),
                ('discount', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Descuento de 1% a 99%', null=True, verbose_name='Descuento')),
                ('final_price', models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=10, null=True, verbose_name='Precio final')),
                ('short_description', models.CharField(blank=True, help_text='Descripción corta (90 carácteres)', max_length=90, null=True, verbose_name='Descripción corta')),
                ('video_link', models.CharField(blank=True, help_text='Link del vídeo de youtube', max_length=512, null=True, verbose_name='Link del vídeo')),
                ('support_email', models.EmailField(blank=True, help_text='Correo electrónico de soporte', max_length=128, null=True, verbose_name='Correo de soporte')),
                ('support_info', models.CharField(blank=True, help_text='Información de soporte', max_length=256, null=True, verbose_name='Información de soporte')),
                ('support_phone', models.CharField(blank=True, help_text='Teléfono de soporte', max_length=12, null=True, verbose_name='Teléfono de soporte')),
                ('times_selled', models.PositiveSmallIntegerField(blank=True, default=0, verbose_name='Cantidad de veces vendido')),
                ('views', models.PositiveSmallIntegerField(blank=True, default=0, verbose_name='Cantidad de veces visto')),
            ],
            options={
                'verbose_name': 'Inmueble',
                'verbose_name_plural': 'Inmuebles',
            },
        ),
        migrations.CreateModel(
            name='RealEstateClassification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, default='Descripción', null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture)),
                ('name', models.CharField(max_length=64)),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
            ],
            options={
                'verbose_name': 'Categoría del inmueble',
                'verbose_name_plural': 'Categorías de inmuebles',
            },
        ),
        migrations.CreateModel(
            name='RealEstateFeature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('name', models.CharField(max_length=64, unique=True)),
            ],
            options={
                'verbose_name': 'Caracteristica del inmueble',
                'verbose_name_plural': 'Caracteristicas de los inmuebles',
            },
        ),
        migrations.CreateModel(
            name='RealEstatePicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveSmallIntegerField(default=1)),
                ('name', models.CharField(blank=True, max_length=64, null=True)),
                ('description', tinymce.models.HTMLField(blank=True, default='Descripción', null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture)),
                ('real_estate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='real_estate.realestate', verbose_name='Inmueble')),
                ('stand', models.ForeignKey(help_text='Empresa al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Empresa')),
            ],
            options={
                'verbose_name': 'Foto del inmueble',
                'verbose_name_plural': 'Fotos de los inmuebles',
            },
        ),
        migrations.AddField(
            model_name='realestate',
            name='classification',
            field=models.ForeignKey(help_text='Clasificación al que pertenece este registro', on_delete=django.db.models.deletion.CASCADE, to='real_estate.realestateclassification', verbose_name='Clasificación'),
        ),
        migrations.AddField(
            model_name='realestate',
            name='features',
            field=models.ManyToManyField(blank=True, related_name='real_estate_features', to='real_estate.RealEstateFeature', verbose_name='Caractarísticas del inmueble'),
        ),
        migrations.AddField(
            model_name='realestate',
            name='real_estate_pictures',
            field=models.ManyToManyField(blank=True, help_text='Fotos del inmueble', related_name='real_estate_pictures', to='real_estate.RealEstatePicture', verbose_name='Fotos'),
        ),
        migrations.AddField(
            model_name='realestate',
            name='related',
            field=models.ManyToManyField(blank=True, related_name='related_real_estates', to='real_estate.RealEstate', verbose_name='Inmuebles relacionados'),
        ),
        migrations.AddField(
            model_name='realestate',
            name='stand',
            field=models.ForeignKey(help_text='Empresa al que pertenece este registro', on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Empresa'),
        ),
    ]
