from ninja import Router, Schema

from .models import Project, Task

router = Router()


@router.get("/")
def hello(request, name):
    return f"Hello {name}"


class UserSchema(Schema):
    username: str
    email: str
    first_name: str
    last_name: str


class Error(Schema):
    message: str


@router.get("/me", response={200: UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"message": "Please sign in first"}

    return request.user
