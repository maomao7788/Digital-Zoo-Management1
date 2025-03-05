from rest_framework import serializers
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
class HabitatSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitat
        fields = ['id', 'name']
class AnimalSerializer(serializers.ModelSerializer):
    habitat = serializers.PrimaryKeyRelatedField(queryset=Habitat.objects.all())
    habitat_info = HabitatSimpleSerializer(source='habitat',read_only=True)
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
    user = UserSerializer()

    class Meta:
        model = Zookeeper
        fields = ['id', 'user', 'role', 'qualifications', 'responsibilities', 'email']

    # 如果需要在创建/更新Zookeeper时同步创建/更新User，可重写create/update方法：
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        zookeeper = Zookeeper.objects.create(user=user, **validated_data)
        return zookeeper

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class CareRoutineSerializer(serializers.ModelSerializer):
    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        source='animal',
        write_only=True
    )
    zookeeper = ZookeeperSerializer(read_only=True)
    zookeeper_id = serializers.PrimaryKeyRelatedField(
        queryset=Zookeeper.objects.all(),
        source='zookeeper',
        write_only=True
    )

    class Meta:
        model = CareRoutine
        fields = [
            'id', 'animal', 'animal_id',
            'feeding_time', 'diet_type', 'medical_needs',
            'zookeeper', 'zookeeper_id'
        ]

class ActivityLogSerializer(serializers.ModelSerializer):
    zookeeper = ZookeeperSerializer(read_only=True)
    zookeeper_id = serializers.PrimaryKeyRelatedField(
        queryset=Zookeeper.objects.all(),
        source='zookeeper',
        write_only=True
    )
    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        source='animal',
        write_only=True
    )

    class Meta:
        model = ActivityLog
        fields = [
            'id', 'zookeeper', 'zookeeper_id', 'animal',
            'animal_id', 'activity_description', 'date_time'
        ]

