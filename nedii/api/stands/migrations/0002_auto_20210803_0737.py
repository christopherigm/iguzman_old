# Generated by Django 3.1.5 on 2021-08-03 07:37

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('stands', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stand',
            name='about',
            field=tinymce.models.HTMLField(blank=True, null=True, verbose_name='Acerca del Stand'),
        ),
        migrations.AlterField(
            model_name='stand',
            name='vision',
            field=tinymce.models.HTMLField(blank=True, help_text='Incluye una descipción breve para tus clientes', null=True, verbose_name='Visión del Stand'),
        ),
    ]