# Generated by Django 3.2.7 on 2022-02-02 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0004_alter_vehicle_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='full_size',
            field=models.BooleanField(default=True, verbose_name='Tamano completo'),
        ),
        migrations.AddField(
            model_name='vehicleclassification',
            name='full_size',
            field=models.BooleanField(default=True, verbose_name='Tamano completo'),
        ),
        migrations.AddField(
            model_name='vehiclemake',
            name='full_size',
            field=models.BooleanField(default=True, verbose_name='Tamano completo'),
        ),
        migrations.AddField(
            model_name='vehiclemodel',
            name='full_size',
            field=models.BooleanField(default=True, verbose_name='Tamano completo'),
        ),
        migrations.AddField(
            model_name='vehiclepicture',
            name='full_size',
            field=models.BooleanField(default=True, verbose_name='Tamano completo'),
        ),
    ]