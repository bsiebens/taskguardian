from ninja_extra import api_controller, route
from ninja.responses import codes_4xx
from django.shortcuts import get_object_or_404
from ninja import ModelSchema, Schema
import typing
from .models import Project


class ProjectSchema(ModelSchema):
    path: typing.List[str]

    class Config:
        model = Project
        model_fields = ["id", "name", "parent", "created", "modified"]

    @staticmethod
    def resolve_path(obj):
        return [node.name for node in obj.ancestors(include_self=True)]


class DetailMessage(Schema):
    detail: str


@api_controller("/projects", tags=["Projects"])
class ProjectsAPI:
    @route.get("", response={200: typing.List[ProjectSchema]})
    def list_projects(self):
        return Project.objects.with_tree_fields()

    @route.get("{project_id}", response={200: ProjectSchema, 404: DetailMessage})
    def list_project(self, project_id: int):
        return get_object_or_404(Project, pk=project_id)

    @route.get("{project_id}/children", response={200: typing.List[ProjectSchema]})
    def list_project_children(self, project_id: int):
        return Project.objects.get(pk=project_id).descendants()


""" from ninja import Router, ModelSchema
from typing import List

from .models import Project, Task

router = Router()


class ProjectSchema(ModelSchema):
    project_path: List[str]

    class Config:
        model = Project
        model_fields = ["id", "name", "created", "modified"]

    @staticmethod
    def resolve_project_path(obj):
        return [node.name for node in obj.ancestors(include_self=True)]


ProjectSchema.update_forward_refs()


@router.get("/projects", response=List[ProjectSchema], tags=["projects"])
def list_projects(request):
    Returns a list of all projects. This list does not contain any information about the number of tasks
    or the tasks themselves linked to these projects.
    return Project.objects.with_tree_fields()
 """
