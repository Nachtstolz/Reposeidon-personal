# Generated by Django 3.2.10 on 2022-05-04 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reposeidon_app', '0003_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='file',
            name='remark',
            field=models.TextField(),
        ),
    ]
