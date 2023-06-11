from ninja import Router, ModelSchema
from typing import List

from .models import Project, Task

router = Router()


class ProjectSchema(ModelSchema):
    parent: "ProjectSchema" = None
    full_name: str

    class Config:
        model = Project
        model_fields = ["id", "name", "created", "modified"]

    @staticmethod
    def resolve_full_name(obj):
        return " - ".join([node.name for node in obj.ancestors(include_self=True)])


ProjectSchema.update_forward_refs()


@router.get("/projects", response=List[ProjectSchema])
def list_projects(request):
    return Project.objects.with_tree_fields()
