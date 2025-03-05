from rest_framework import serializers
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog

class HabitatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'  
class AnimalSerializer(serializers.ModelSerializer):
    habitat = HabitatSerializer(read_only=True) 
    class Meta:
        model = Animal
        fields = '__all__'  
class ZookeeperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zookeeper
        fields = '__all__'

class CareRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareRoutine
        fields = '__all__'

class ActivityLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityLog
        fields = '__all__'