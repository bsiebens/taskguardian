from django.contrib import admin

from .models import Task, Project


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "due", "priority", "urgency", "created", "modified"]
    list_display_links = ["name"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)

        return qs.with_tree_fields()

    @admin.display(description="Name")
    def name_with_identation(self, obj):
        return "{spacer} {name}".format(spacer=" --- " * obj.tree_depth, name=obj.name)

    list_display = ["id", "name_with_identation", "created", "modified"]
    list_display_links = ["name_with_identation"]
