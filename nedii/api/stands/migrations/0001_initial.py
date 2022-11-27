# Generated by Django 3.1.5 on 2021-08-03 07:31

import colorfield.fields
import common.models.picture
import common.validators
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_resized.forms
import stands.models.stands.stand
import stands.models.stands.stand_promotions
import tinymce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('common', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Expo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[1080, 1080], upload_to=common.models.picture.picture)),
                ('title', models.CharField(max_length=64)),
                ('real', models.BooleanField(default=False, help_text='Define si es una exposición física', verbose_name='Expo Física')),
                ('email', models.EmailField(help_text='Correo electrónico del responsable', max_length=128, verbose_name='Correo electrónico')),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
            ],
            options={
                'verbose_name': 'Expo',
                'verbose_name_plural': 'Expos',
            },
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[1080, 1080], upload_to=common.models.picture.picture)),
                ('title', models.CharField(max_length=64)),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('icon', models.CharField(blank=True, max_length=32, null=True)),
                ('color', colorfield.fields.ColorField(blank=True, default='#42a5f5', max_length=18, null=True)),
            ],
            options={
                'verbose_name': 'Grupo',
                'verbose_name_plural': 'Grupos',
            },
        ),
        migrations.CreateModel(
            name='Stand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('restaurant', models.BooleanField(blank=True, default=False, help_text='Indica si este Stand es un Resturante', verbose_name='Es Restaurante')),
                ('name', models.CharField(max_length=128, verbose_name='Nombre del Stand')),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('slogan', models.CharField(blank=True, max_length=90, null=True, verbose_name='Slogan')),
                ('bar_code', models.CharField(blank=True, max_length=400, null=True, unique=True, verbose_name='Código de Barras')),
                ('description', tinymce.models.HTMLField(blank=True, null=True, verbose_name='Descripción del stand')),
                ('short_description', models.CharField(blank=True, help_text='Descripción corta (90 carácteres)', max_length=90, null=True, verbose_name='Descripción corta')),
                ('img_logo', django_resized.forms.ResizedImageField(crop=None, force_format='JPEG', help_text='Logo del stand', keep_meta=True, null=True, quality=100, size=[256, 256], upload_to=stands.models.stands.stand.stand, verbose_name='Logo')),
                ('img_cover', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', help_text='Imágen Cover del stand', keep_meta=True, null=True, quality=90, size=[1920, 1080], upload_to=stands.models.stands.stand.stand, verbose_name='Imágen Cover')),
                ('contact_email', models.EmailField(help_text='Correo electrónico de contacto', max_length=128, verbose_name='Correo de contacto')),
                ('support_email', models.EmailField(blank=True, help_text='Correo electrónico de soporte', max_length=128, null=True, verbose_name='Correo de soporte')),
                ('always_open', models.BooleanField(default=False, verbose_name='Siempre abierto')),
                ('monday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los lunes')),
                ('monday_close', models.TimeField(blank=True, default='18:00', null=True, verbose_name='Cierre los lunes')),
                ('tuesday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los martes')),
                ('tuesday_close', models.TimeField(blank=True, default='18:00', null=True, verbose_name='Cierre los martes')),
                ('wednesday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los miércoles')),
                ('wednesday_close', models.TimeField(blank=True, default='18:00', null=True, verbose_name='Cierre los miércoles')),
                ('thursday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los jueves')),
                ('thursday_close', models.TimeField(blank=True, default='18:00', null=True, verbose_name='Cierre los jueves')),
                ('friday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los viernes')),
                ('friday_close', models.TimeField(blank=True, default='18:00', null=True, verbose_name='Cierre los viernes')),
                ('saturday_open', models.TimeField(blank=True, default='09:00', null=True, verbose_name='Apertura los sabados')),
                ('saturday_close', models.TimeField(blank=True, default='14:00', null=True, verbose_name='Cierre los sabados')),
                ('sunday_open', models.TimeField(blank=True, default=None, null=True, verbose_name='Apertura los domingos')),
                ('sunday_close', models.TimeField(blank=True, default=None, null=True, verbose_name='Cierre los domingos')),
                ('booking_active', models.BooleanField(default=False, help_text='Define si este stand admite reservaciones', verbose_name='Reservaciones activas')),
                ('booking_fee', models.PositiveIntegerField(blank=True, default=5, null=True, verbose_name='Costo de la reservación')),
                ('booking_email', models.EmailField(blank=True, help_text='Correo electrónico de reservaciones', max_length=128, null=True, verbose_name='Correo de reservaciones')),
                ('zip_code', models.CharField(blank=True, max_length=5, null=True, validators=[common.validators.ModelValidators.us_zip_code])),
                ('address', models.CharField(help_text='Dirección física del Stand', max_length=256, verbose_name='Dirección del Stand')),
                ('about', tinymce.models.HTMLField(blank=True, null=True, verbose_name='Acerca del Stand en inglés')),
                ('vision', tinymce.models.HTMLField(blank=True, help_text='Incluye una descipción breve para tus clientes', null=True, verbose_name='Visión del Stand en inglés')),
                ('web_link', models.URLField(blank=True, help_text='Link de página web del Stand', null=True, verbose_name='Web del Stand')),
                ('facebook_link', models.URLField(blank=True, help_text='Link del Facebook del Stand', max_length=256, null=True, verbose_name='Facebook del Stand')),
                ('twitter_link', models.URLField(blank=True, help_text='Link del Twitter del Stand', null=True, verbose_name='Twitter del Stand')),
                ('instagram_link', models.URLField(blank=True, help_text='Link del Instagram del Stand', null=True, verbose_name='Instagram del Stand')),
                ('linkedin_link', models.URLField(blank=True, help_text='Link de Linkedin del Stand', null=True, verbose_name='LinkedIn del Stand')),
                ('google_link', models.URLField(blank=True, help_text='Link del Google del Stand', null=True, verbose_name='Google+ del Stand')),
                ('youtube_link', models.URLField(blank=True, help_text='Link del Youtube del Stand', null=True, verbose_name='Youtube del Stand')),
                ('city', models.ForeignKey(help_text='Ciudad al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='common.city', verbose_name='Ciudad')),
                ('group', models.ForeignKey(help_text='Grupo al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.group', verbose_name='Grupo')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Stand',
                'verbose_name_plural': 'Stands',
            },
        ),
        migrations.CreateModel(
            name='StandBookingQuestionOptions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('en_value', models.CharField(blank=True, max_length=128, null=True, verbose_name='Título en inglés')),
                ('es_value', models.CharField(blank=True, max_length=128, null=True, verbose_name='Título en español')),
            ],
            options={
                'verbose_name': 'Respuesta de pregunta de reservación',
                'verbose_name_plural': 'Respuestas de preguntas de reservaciones',
            },
        ),
        migrations.CreateModel(
            name='SurveyQuestions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('open_answer', models.BooleanField(default=True, verbose_name='Es pregunta abierta')),
                ('en_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Nombre en inglés')),
                ('es_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Nombre en español')),
            ],
            options={
                'verbose_name': 'Pregunta de encuesta',
                'verbose_name_plural': 'Preguntas de encuestas',
            },
        ),
        migrations.CreateModel(
            name='VideoLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('en_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Nombre en inglés')),
                ('es_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Nombre en español')),
                ('link', models.URLField(max_length=256, verbose_name='Link del vídeo')),
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Link de vídeo',
                'verbose_name_plural': 'Links de vídeos',
            },
        ),
        migrations.CreateModel(
            name='StandRating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('rating', models.PositiveIntegerField(default=5)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Autor')),
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Puntuación',
                'verbose_name_plural': 'Puntuaciones',
            },
        ),
        migrations.CreateModel(
            name='StandPromotions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('en_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Título en inglés')),
                ('es_name', models.CharField(blank=True, max_length=128, null=True, verbose_name='Título en español')),
                ('en_description', tinymce.models.HTMLField(blank=True, null=True, verbose_name='Descripción en inglés')),
                ('es_description', tinymce.models.HTMLField(blank=True, null=True, verbose_name='Descripción en español')),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', help_text='Imágen', keep_meta=True, null=True, quality=85, size=[512, 512], upload_to=common.models.picture.picture, verbose_name='Imágen')), #
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Promoción de Stand',
                'verbose_name_plural': 'Promociones de Stands',
            },
        ),
        migrations.CreateModel(
            name='StandPictures',
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
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[1080, 1080], upload_to=common.models.picture.picture)),
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Foto de Stand',
                'verbose_name_plural': 'Fotos de Stands',
            },
        ),
        migrations.CreateModel(
            name='StandPhones',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('phone', models.CharField(help_text='Teléfono del stand', max_length=10, verbose_name='Teléfono')),
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Teléfono de Stand',
                'verbose_name_plural': 'Teléfonos de los Stands',
            },
        ),
        migrations.CreateModel(
            name='StandNews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('description', tinymce.models.HTMLField(blank=True, null=True)),
                ('href', models.URLField(blank=True, null=True)),
                ('img_picture', django_resized.forms.ResizedImageField(blank=True, crop=None, force_format='JPEG', keep_meta=True, null=True, quality=85, size=[1080, 1080], upload_to=common.models.picture.picture)),
                ('title', models.CharField(max_length=64)),
                ('slug', models.SlugField(blank=True, max_length=64, null=True, unique=True)),
                ('stand', models.ForeignKey(help_text='Stand al que pertenece este registro', null=True, on_delete=django.db.models.deletion.CASCADE, to='stands.stand', verbose_name='Stand')),
            ],
            options={
                'verbose_name': 'Noticia de Stand',
                'verbose_name_plural': 'Noticias de Stands',
            },
        ),
        migrations.CreateModel(
            name='StandBookingQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('en_name', models.CharField(max_length=128, verbose_name='Título en inglés')),
                ('es_name', models.CharField(max_length=128, verbose_name='Título en español')),
                ('options', models.ManyToManyField(blank=True, related_name='question_options', to='stands.StandBookingQuestionOptions', verbose_name='Respuestas')),
            ],
            options={
                'verbose_name': 'Pregunta de reservación',
                'verbose_name_plural': 'Preguntas de reservaciones',
            },
        ),
        migrations.AddField(
            model_name='stand',
            name='panorama',
            field=models.ManyToManyField(blank=True, help_text='Imágenes 360° del stand', related_name='stand_panorama', to='stands.StandPictures', verbose_name='Imágenes 360°'),
        ),
        migrations.AddField(
            model_name='stand',
            name='phones',
            field=models.ManyToManyField(blank=True, help_text='Teléfonos del stand', related_name='stand_phones', to='stands.StandPhones', verbose_name='Teléfonos'),
        ),
        migrations.AddField(
            model_name='stand',
            name='pictures',
            field=models.ManyToManyField(blank=True, help_text='Fotos del stand', related_name='stand_pictures', to='stands.StandPictures', verbose_name='Fotos'),
        ),
        migrations.AddField(
            model_name='stand',
            name='promotions',
            field=models.ManyToManyField(blank=True, help_text='Promociones del stand', related_name='stand_promotions', to='stands.StandPromotions', verbose_name='Promociones'),
        ),
        migrations.AddField(
            model_name='stand',
            name='stand_booking_quiestions',
            field=models.ManyToManyField(blank=True, help_text='Formulario de reservaciones', related_name='stand_booking_quiestions', to='stands.StandBookingQuestion', verbose_name='Informacion de reservaciones'),
        ),
        migrations.AddField(
            model_name='stand',
            name='stand_news',
            field=models.ManyToManyField(blank=True, help_text='Noticias del stand', related_name='stand_news', to='stands.StandNews', verbose_name='Noticias'),
        ),
        migrations.AddField(
            model_name='stand',
            name='survey_quetions',
            field=models.ManyToManyField(blank=True, help_text='Seleccione preguntas de la encuesta', related_name='survey_quetions', to='stands.SurveyQuestions', verbose_name='Preguntas de la encuesta'),
        ),
        migrations.AddField(
            model_name='stand',
            name='video_links',
            field=models.ManyToManyField(blank=True, related_name='stand_video_links', to='stands.VideoLink', verbose_name='Links de Videos'),
        ),
    ]
