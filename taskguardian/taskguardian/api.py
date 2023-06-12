from ninja import NinjaAPI
from tasks.api import router as tasks_router

api = NinjaAPI(
    title="TaskGuardian API",
    description="An API for managing and storing tasks. Inspired by TaskWarrior.",
    version="0.0.1",
)

api.add_router("/tasks/", tasks_router)
