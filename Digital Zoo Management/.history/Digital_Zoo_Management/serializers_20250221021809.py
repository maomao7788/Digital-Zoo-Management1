from rest_framework import serializers
from .models import Animal, Habitat

class HabitatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = '__all__'  
class AnimalSerializer(serializers.ModelSerializer):
    habitat = HabitatSerializer(read_only=True)  
    class Meta:
        model = Animal
        fields = '__all__'  