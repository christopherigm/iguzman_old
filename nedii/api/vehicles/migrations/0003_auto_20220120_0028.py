# Generated by Django 3.2.7 on 2022-01-20 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vehicles', '0002_remove_vehicleclassification_stand'),
    ]

    operations = [
        migrations.AddField(
            model_name='vehicle',
            name='state',
            field=models.CharField(blank=True, choices=[('new', 'new'), ('like-new', 'like-new'), ('used', 'used')], default='new', max_length=16, null=True),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='doors',
            field=models.PositiveSmallIntegerField(default=4, help_text='Numero de puertas', verbose_name='Numero de puertas'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehicle',
            name='warranty_days',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Días de garantía del vehiculo', verbose_name='Días de garantía'),
        ),
        migrations.AlterField(
            model_name='vehicleclassification',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehicleclassification',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehiclefeature',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehiclefeature',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehiclemake',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehiclemake',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehiclemodel',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehiclemodel',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='vehiclepicture',
            name='order',
            field=models.PositiveSmallIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento'),
        ),
        migrations.AlterField(
            model_name='vehiclepicture',
            name='version',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
