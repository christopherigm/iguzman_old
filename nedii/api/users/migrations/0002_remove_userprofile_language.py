# Generated by Django 3.1.5 on 2021-08-03 07:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='language',
        ),
    ]
