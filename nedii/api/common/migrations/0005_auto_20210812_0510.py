# Generated by Django 3.1.5 on 2021-08-12 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0004_auto_20210812_0508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='changelog',
            name='hours',
            field=models.PositiveIntegerField(default=1, verbose_name='Development time (hours)'),
        ),
    ]