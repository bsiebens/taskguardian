from tasklib import Task, TaskWarrior
from .serializers import TaskSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class Task(viewsets.ViewSet):
    def __init__(self, *args, **kwargs):
        self.taskwarrior = TaskWarrior()

        return super(Task, self).__init__(*args, **kwargs)

    def list(self, request):
        tasks = self.taskwarrior.tasks.all()

        return Response(TaskSerializer(tasks, many=True).data)

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk=None):
        pass

    def destroy(self, request, pk=None):
        pass
