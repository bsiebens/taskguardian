from django.db import models
from tree_queries.models import TreeNode


class Project(TreeNode):
    name = models.CharField(max_length=250)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    class PriorityChoices(models.TextChoices):
        NONE = "none"
        LOW = "low"
        MEDIUM = "medium"
        HIGH = "high"

    name = models.CharField(max_length=250)
    description = models.TextField(null=True, blank=True)

    priority = models.CharField(max_length=6, choices=PriorityChoices.choices, default=PriorityChoices.NONE)
    due = models.DateTimeField(blank=True, null=True)

    project = models.ForeignKey(Project, blank=True, null=True, on_delete=models.SET_NULL)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
