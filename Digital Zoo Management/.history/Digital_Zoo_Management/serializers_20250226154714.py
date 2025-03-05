from rest_framework import serializers
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog

class HabitatSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = ['id', 'name']
        
class AnimalSerializer(serializers.ModelSerializer):
    habitat = serializers.PrimaryKeyRelatedField(queryset=Habitat.objects.all())
    habitat_name = serializers.CharField(source='habitat.name', read_only=True)
    class Meta:
        model = Animal
        fields = '__all__'
class HabitatSerializer(serializers.ModelSerializer):
    animals = AnimalSerializer(many=True, read_only=True)
    suitable_species = serializers.SerializerMethodField()

    class Meta:
        model = Habitat
        fields = '__all__'  
    def get_suitable_species(self, obj):
        return list(set(animal.species for animal in obj.animals.all()))

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