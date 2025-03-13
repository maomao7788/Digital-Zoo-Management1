from rest_framework import serializers
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog,Membership, SpecialEvent, EventRegistration, Feedback
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    is_superuser = serializers.BooleanField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_superuser']
        
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
    user_info = UserSerializer(source='user', read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    class Meta:
        model = Zookeeper
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user') 
        return Zookeeper.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        if 'user' in validated_data:
            instance.user = validated_data['user']
        instance.role = validated_data.get('role', instance.role)
        instance.qualifications = validated_data.get('qualifications', instance.qualifications)
        instance.responsibilities = validated_data.get('responsibilities', instance.responsibilities)
        instance.email = validated_data.get('email', instance.email)
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
        fields = ['id', 'animal', 'animal_id', 'zookeeper', 'zookeeper_id', 'feeding_time', 'diet_type', 'medical_needs', 'date']
class ActivityLogSerializer(serializers.ModelSerializer):
    zookeeper = ZookeeperSerializer(read_only=True)
    zookeeper_id = serializers.PrimaryKeyRelatedField(
        queryset=Zookeeper.objects.all(),
        source='zookeeper',
        write_only=True
    )
    animal_name = serializers.CharField(source='care_routine.animal.name', read_only=True)
    feeding_time = serializers.TimeField(source='care_routine.feeding_time', format="%H:%M", read_only=True)
    diet_type = serializers.CharField(source='care_routine.diet_type', read_only=True)
    medical_needs = serializers.CharField(source='care_routine.medical_needs', read_only=True)
    date = serializers.DateField(source='care_routine.date', read_only=True)

    animal = AnimalSerializer(read_only=True)
    animal_id = serializers.PrimaryKeyRelatedField(
        queryset=Animal.objects.all(),
        source='animal',
        write_only=True
    )

    class Meta:
        model = ActivityLog
        fields = '__all__'

# class MembershipSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)

#     class Meta:
#         model = Membership
#         fields = '__all__'

# class SpecialEventSerializer(serializers.ModelSerializer):
#     created_by = UserSerializer(read_only=True)
    
#     class Meta:
#         model = SpecialEvent
#         fields = '__all__'
    
#     def create(self, validated_data):

#         user = self.context['request'].user
#         validated_data['created_by'] = user
#         return super().create(validated_data)

# class EventRegistrationSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     event = SpecialEventSerializer(read_only=True)

#     class Meta:
#         model = EventRegistration
#         fields = '__all__'

# class FeedbackSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)

#     class Meta:
#         model = Feedback
#         fields = '__all__'

# class MembershipApplicationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Membership
#         fields = ['tier', 'cost', 'benefits']

#     def create(self, validated_data):
#         user = self.context['request'].user
#         membership = Membership.objects.create(user=user, **validated_data)
#         return membership
    
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class MembershipSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  
    is_active = serializers.BooleanField(source='active', read_only=True)  

    class Meta:
        model = Membership
        fields = ['id', 'user', 'tier', 'start_date', 'expiry_date', 'cost', 'benefits', 'is_active']
# class ProfileSerializer(serializers.ModelSerializer):
#     membership = MembershipSerializer(source='membership', read_only=True)
    
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'membership']

# class EventRegistrationCreateSerializer(serializers.ModelSerializer):
#     event_id = serializers.PrimaryKeyRelatedField(
#         queryset=SpecialEvent.objects.all(),
#         source='event'
#     )
    
#     class Meta:
#         model = EventRegistration
#         fields = ['event_id']
    
#     def create(self, validated_data):
#         request = self.context['request']
#         validated_data['user'] = request.user
#         return super().create(validated_data)
    
# class FeedbackCreateSerializer(serializers.ModelSerializer):
#     event_id = serializers.PrimaryKeyRelatedField(
#         queryset=SpecialEvent.objects.all(),
#         source='event'
#     )
    
#     class Meta:
#         model = Feedback
#         fields = ['event_id', 'content']
    
#     def create(self, validated_data):
#         validated_data['user'] = self.context['request'].user
#         return super().create(validated_data)