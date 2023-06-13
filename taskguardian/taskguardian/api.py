from ninja_extra import NinjaExtraAPI
from tasks.api import ProjectsAPI

api = NinjaExtraAPI(title="TaskGuardian API", version="0.0.1", description="An API for managing and storing tasks. Inspired by TaskWarrior.")

api.register_controllers(ProjectsAPI)
