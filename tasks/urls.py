from django.urls import path, include
from .views import Task
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"tasks", Task, basename="task")

urlpatterns = router.urls
