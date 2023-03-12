from tasklib import Task
from rest_framework import serializers


class TaskSerializer(serializers.Serializer):
    # id = serializers.IntegerField()
    # uuid = serializers.UUIDField()
    # description = serializers.CharField()
    _data = serializers.DictField()


""" class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task """


""" class TaskSerializer(serializers.Serializer):
    id
    uuid
    priority
    urgency
    description
    project
    tags
    due
    wait
    until
    scheduled
    depends
    annotations
    saved
    pending
    active
    completed
    deleted """
