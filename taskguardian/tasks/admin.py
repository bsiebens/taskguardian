from django.contrib import admin

from .models import Task, Project


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "due", "priority", "urgency", "created", "modified"]
    list_display_links = ["name"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "created", "modified"]
    list_display_links = ["name"]
