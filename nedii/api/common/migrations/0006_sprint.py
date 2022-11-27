# Generated by Django 3.1.5 on 2021-08-12 16:33

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0005_auto_20210812_0510'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sprint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enabled', models.BooleanField(default=True, help_text='Define si este registro estará habilitado', verbose_name='Registro habilitado')),
                ('order', models.PositiveIntegerField(blank=True, default=0, help_text='Índice númerico de ordenamiento de este registro', null=True, verbose_name='índice de ordenamiento')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('version', models.PositiveIntegerField(default=1)),
                ('name', models.CharField(max_length=256, verbose_name='Sprint Name')),
                ('comments', tinymce.models.HTMLField(blank=True, null=True)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
                ('tasks', models.ManyToManyField(blank=True, related_name='sprint_tasks', to='common.ChangeLog', verbose_name='Tasks')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]