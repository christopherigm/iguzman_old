# Generated by Django 3.1.5 on 2021-08-13 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stands', '0009_auto_20210813_0656'),
    ]

    operations = [
        migrations.AlterField(
            model_name='standbookingquestion',
            name='name',
            field=models.CharField(max_length=128, verbose_name='Pregunta de reservación'),
        ),
    ]
