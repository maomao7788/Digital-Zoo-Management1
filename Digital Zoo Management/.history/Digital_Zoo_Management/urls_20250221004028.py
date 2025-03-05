from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitatViewSet, AnimalViewSet

router = DefaultRouter()
router.register(r'habitats', HabitatViewSet)
router.register(r'animals', AnimalViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]