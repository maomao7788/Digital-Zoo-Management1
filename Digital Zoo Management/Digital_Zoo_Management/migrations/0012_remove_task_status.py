# Generated by Django 5.1.2 on 2025-03-06 10:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Digital_Zoo_Management', '0011_remove_activitylog_care_routine_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='status',
        ),
    ]
