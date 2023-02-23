from django.shortcuts import render
from tasklib import Task, TaskWarrior

TASKWARRIOR = TaskWarrior()


def index(request):
    tasks = TASKWARRIOR.tasks.all()

    print(request.headers)
    print(request.htmx)
    if request.htmx:
        print("true")
    else:
        print("false")

    return render(request, "tasks/index.html", {"tasks": tasks})
