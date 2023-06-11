# Generated by Django 4.2.2 on 2023-06-11 12:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0005_project_parent"),
    ]

    operations = [
        migrations.AddField(
            model_name="task",
            name="project",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="tasks.project",
            ),
        ),
    ]