# Generated by Django 5.1.2 on 2025-03-06 10:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Digital_Zoo_Management', '0013_activitylog_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activitylog',
            name='user',
        ),
        migrations.DeleteModel(
            name='Task',
        ),
    ]
