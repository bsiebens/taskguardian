import datetime
from decimal import Decimal
from django.db import models
from tree_queries.models import TreeNode
from django.utils import timezone


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

    def urgency(self):
        value = 0.0

        # Calculate urgency based on due date. If overdue for more than 7 days, value should be 1.0, if not due
        # for another 2 weeks this value should 0.0. The final score is somewhere lineair in between these 2 values.
        if self.due is not None:
            SECONDS_PER_DAY = 24 * 60 * 60

            due_date_difference = timezone.now() - self.due
            due_date_difference_seconds = (
                due_date_difference.days * SECONDS_PER_DAY + due_date_difference.seconds
                if due_date_difference.days >= 0
                else due_date_difference.days * SECONDS_PER_DAY - due_date_difference.seconds
            )

            if due_date_difference_seconds / SECONDS_PER_DAY >= 7:
                value += 1.0
            elif due_date_difference_seconds / SECONDS_PER_DAY >= -14:
                value += (due_date_difference_seconds / SECONDS_PER_DAY * 0.8 / 21.0) + 0.2
            else:
                value += 0.2

        # If tagged to project urgency increases by 1.0
        if self.project is not None:
            value += 1.0

        # If priority is none = 0.0, low = 0.3, medium = 0.6, high = 1.0
        if self.priority != self.PriorityChoices.NONE:
            if self.priority == self.PriorityChoices.HIGH:
                value += 1.0
            elif self.priority == self.PriorityChoices.MEDIUM:
                value += 0.6
            else:
                value += 0.3

        return value
