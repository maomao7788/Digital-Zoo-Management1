from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitatViewSet,  TaskViewSet,AnimalViewSet,ZookeeperViewSet, CareRoutineViewSet, ActivityLogViewSet, UserViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from .views import RegisterView 
router = DefaultRouter()
router.register(r'habitats', HabitatViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'zookeepers', ZookeeperViewSet)
router.register(r'care-routines', CareRoutineViewSet)
router.register(r'activity-logs', ActivityLogViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/register/', RegisterView.as_view(), name='register'),
]




