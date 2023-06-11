# Generated by Django 4.2.2 on 2023-06-11 12:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("tasks", "0003_task_created_task_due_task_modified"),
    ]

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=250)),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("modified", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]