# Generated by Django 3.2.7 on 2022-02-10 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stands', '0028_auto_20220205_1158'),
    ]

    operations = [
        migrations.AddField(
            model_name='stand',
            name='average_rating',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, verbose_name='Puntuaje promedio'),
        ),
    ]