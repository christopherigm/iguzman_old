# Generated by Django 3.2.12 on 2022-03-18 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0016_nediiplans'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nediiplans',
            name='digital_card',
            field=models.BooleanField(default=True, verbose_name='Terjeta digital habilitada?'),
        ),
    ]