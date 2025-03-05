from django.shortcuts import render
from rest_framework import viewsets
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog
from .serializers import AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer, ActivityLogSerializer
from django.core.mail import send_mail
from datetime import datetime, timedelta
from .models import Zookeeper, CareRoutine
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

def send_daily_notifications():
    today_routines = CareRoutine.objects.filter(feeding_time__date=datetime.today().date())
    # for routine in today_routines:
    #     zookeepers = Zookeeper.objects.all()  
    #     for keeper in zookeepers:
    #         send_mail(
    #             subject=f"Today's Task: Care for {routine.animal.name}",
    #             message=f"Feeding Time: {routine.feeding_time}\nDiet Type: {routine.diet_type}\nMedical Needs: {routine.medical_needs}",
    #             from_email='your-email@gmail.com',
    #             recipient_list=[keeper.user.email],
    #         )