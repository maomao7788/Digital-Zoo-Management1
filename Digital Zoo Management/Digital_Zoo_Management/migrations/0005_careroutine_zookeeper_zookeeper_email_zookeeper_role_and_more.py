# Generated by Django 5.1.2 on 2025-03-04 17:56

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Digital_Zoo_Management', '0004_alter_animal_habitat'),
    ]

    operations = [
        migrations.AddField(
            model_name='careroutine',
            name='zookeeper',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Digital_Zoo_Management.zookeeper'),
        ),
        migrations.AddField(
            model_name='zookeeper',
            name='email',
            field=models.CharField(default=' ', max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='zookeeper',
            name='role',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='habitat',
            name='size',
            field=models.IntegerField(),
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('due_date', models.DateField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('Pending', 'Pending'), ('In Progress', 'In Progress'), ('Completed', 'Completed')], default='Pending', max_length=20)),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Digital_Zoo_Management.animal')),
                ('zookeeper', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Digital_Zoo_Management.zookeeper')),
            ],
        ),
    ]
