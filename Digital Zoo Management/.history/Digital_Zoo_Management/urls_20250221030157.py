from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitatViewSet, AnimalViewSet,ZookeeperViewSet, CareRoutineViewSet, ActivityLogViewSet

router = DefaultRouter()
router.register(r'habitats', HabitatViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'zookeepers', ZookeeperViewSet)
router.register(r'care_routines', CareRoutineViewSet)
router.register(r'activity_logs', ActivityLogViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
]