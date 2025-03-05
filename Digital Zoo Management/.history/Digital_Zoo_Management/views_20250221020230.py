from django.shortcuts import render
from rest_framework import viewsets
from .models import Animal, Habitat
from .serializers import AnimalSerializer, HabitatSerializer


class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer