from ninja import NinjaAPI
from tasks.api import router as tasks_router

api = NinjaAPI()

api.add_router("/tasks/", tasks_router)
