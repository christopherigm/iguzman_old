# Generated by Django 3.2.12 on 2022-03-23 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_auto_20220323_0206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraddress',
            name='address_type',
            field=models.CharField(blank=True, choices=[('house', 'house'), ('apartment', 'apartment'), ('work', 'work'), ('mail_box', 'mail_box')], max_length=16, null=True),
        ),
    ]