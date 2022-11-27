# Generated by Django 3.1.5 on 2021-09-05 08:28

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('stands', '0017_auto_20210905_0810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expo',
            name='description',
            field=tinymce.models.HTMLField(blank=True, default='Descripción', null=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='description',
            field=tinymce.models.HTMLField(blank=True, default='Descripción', null=True),
        ),
        migrations.AlterField(
            model_name='standnews',
            name='description',
            field=tinymce.models.HTMLField(blank=True, default='Descripción', null=True),
        ),
        migrations.AlterField(
            model_name='standpictures',
            name='description',
            field=tinymce.models.HTMLField(blank=True, default='Descripción', null=True),
        ),
        migrations.AlterField(
            model_name='standpromotion',
            name='description',
            field=tinymce.models.HTMLField(blank=True, default='Descripción', null=True),
        ),
    ]
