# Generated by Django 3.2.7 on 2022-01-11 05:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stands', '0022_auto_20220110_0931'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expo',
            old_name='title',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='group',
            old_name='title',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='standnews',
            old_name='title',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='standpictures',
            old_name='title',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='standpromotion',
            old_name='title',
            new_name='name',
        ),
    ]
