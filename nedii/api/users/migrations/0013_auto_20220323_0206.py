# Generated by Django 3.2.12 on 2022-03-23 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0012_auto_20220310_2246'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraddress',
            name='address_type',
            field=models.CharField(blank=True, choices=[('Casa', 'Casa'), ('Departamento', 'Departamento'), ('Trabajo', 'Trabajo'), ('Buzon', 'Buzon')], max_length=16, null=True),
        ),
        migrations.AddField(
            model_name='useraddress',
            name='delivery_instructions',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='ext_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='useraddress',
            name='int_number',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
