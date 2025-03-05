from django.shortcuts import render
from rest_framework import viewsets
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog
from .serializers import AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer, ActivityLogSerializer


class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
class ZookeeperViewSet(viewsets.ModelViewSet):
    queryset = Zookeeper.objects.all()
    serializer_class = ZookeeperSerializer
class CareRoutineViewSet(viewsets.ModelViewSet):
    queryset = CareRoutine.objects.all()
    serializer_class = CareRoutineSerializer
class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer