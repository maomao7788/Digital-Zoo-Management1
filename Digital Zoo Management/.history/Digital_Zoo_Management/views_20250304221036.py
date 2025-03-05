from rest_framework import viewsets
from .models import Animal, Habitat,Zookeeper, CareRoutine, Task, ActivityLog
from .serializers import AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer, TaskSerializer, ActivityLogSerializer 
from django.core.mail import send_mail
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
class ZookeeperViewSet(viewsets.ModelViewSet):
    queryset = Zookeeper.objects.all()
    serializer_class = ZookeeperSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
class CareRoutineViewSet(viewsets.ModelViewSet):
    queryset = CareRoutine.objects.all()
    serializer_class = CareRoutineSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     instance = serializer.save()
    #     if instance.zookeeper and instance.zookeeper.email:
    #         subject = "新的照料任务通知"
    #         message = (
    #             f"你好，{instance.zookeeper.user.username}，\n\n"
    #             f"你有一项新的照料任务：\n"
    #             f"动物: {instance.animal.name}\n"
    #             f"喂食时间: {instance.feeding_time}\n"
    #             f"饮食类型: {instance.diet_type}\n"
    #             f"医疗需求: {instance.medical_needs}\n"
    #             f"请及时查看并处理。"
    #         )
    #         recipient_list = [instance.zookeeper.email]
    #         send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)
class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]























# class ZookeeperViewSet(viewsets.ModelViewSet):
#     queryset = Zookeeper.objects.all()
#     serializer_class = ZookeeperSerializer
# class CareRoutineViewSet(viewsets.ModelViewSet):
#     queryset = CareRoutine.objects.all()
#     serializer_class = CareRoutineSerializer
# class ActivityLogViewSet(viewsets.ModelViewSet):
#     queryset = ActivityLog.objects.all()
#     serializer_class = ActivityLogSerializer

# class RegisterSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('username', 'password', 'email')
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

# # register view
# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer


# class ProtectedAnimalViewSet(viewsets.ModelViewSet):
#     queryset = Animal.objects.all()
#     serializer_class = AnimalSerializer
#     permission_classes = [IsAuthenticated]  # only permit users who login access
# def send_daily_notifications():
#     today_routines = CareRoutine.objects.filter(feeding_time__date=datetime.today().date())
    # for routine in today_routines:
    #     zookeepers = Zookeeper.objects.all()  
    #     for keeper in zookeepers:
    #         send_mail(
    #             subject=f"Today's Task: Care for {routine.animal.name}",
    #             message=f"Feeding Time: {routine.feeding_time}\nDiet Type: {routine.diet_type}\nMedical Needs: {routine.medical_needs}",
    #             from_email='your-email@gmail.com',
    #             recipient_list=[keeper.user.email],
    #         )