from django.shortcuts import render
from tasklib import Task, TaskWarrior

TASKWARRIOR = TaskWarrior()


def index(request):
    tasks = TASKWARRIOR.tasks.all()

    return render(request, "tasks/index.html", {"tasks": tasks})
