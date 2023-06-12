from ninja import Router, ModelSchema
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
    """Returns a list of all projects. This list does not contain any information about the number of tasks
    or the tasks themselves linked to these projects."""
    return Project.objects.with_tree_fields()
