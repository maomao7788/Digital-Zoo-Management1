from django.forms import ValidationError
from rest_framework import viewsets, permissions
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog,Membership, SpecialEvent, EventRegistration, Feedback
from .serializers import UserRegisterSerializer,AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer,  ActivityLogSerializer,MembershipSerializer,MembershipAdminSerializer
# ,MembershipSerializer, SpecialEventSerializer, EventRegistrationSerializer, FeedbackSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from rest_framework import status
from django.utils.timezone import now
from rest_framework.decorators import api_view, permission_classes, action
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from rest_framework.permissions import AllowAny

class HabitatViewSet(viewsets.ModelViewSet):
    queryset = Habitat.objects.all()
    serializer_class = HabitatSerializer
class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
       # permission_classes = [IsAuthenticatedOrReadOnly]
class ZookeeperViewSet(viewsets.ModelViewSet):
    queryset = Zookeeper.objects.all()
    serializer_class = ZookeeperSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
class CareRoutineViewSet(viewsets.ModelViewSet):
    queryset = CareRoutine.objects.all()
    serializer_class = CareRoutineSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
    def perform_create(self, serializer):
        care_routine = serializer.save()
        ActivityLog.objects.create(
            zookeeper=care_routine.zookeeper,
            care_routine=care_routine,
            status="Assigned"
        )
class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()

# class TaskViewSet(viewsets.ModelViewSet):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = [AllowAny]


# class MembershipViewSet(viewsets.ModelViewSet):
#     queryset = Membership.objects.all()
#     serializer_class = MembershipSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class SpecialEventViewSet(viewsets.ModelViewSet):
#     queryset = SpecialEvent.objects.all()
#     serializer_class = SpecialEventSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# class EventRegistrationViewSet(viewsets.ModelViewSet):
#     queryset = EventRegistration.objects.all()
#     serializer_class = EventRegistrationSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     @action(detail=True, methods=['post'])
#     def approve(self, request, pk=None):
#         registration = self.get_object()
#         registration.status = 'Approved'
#         registration.save()
#         return Response({'status': 'approved'})

#     @action(detail=True, methods=['post'])
#     def reject(self, request, pk=None):
#         registration = self.get_object()
#         registration.status = 'Rejected'
#         registration.save()
#         return Response({'status': 'rejected'})
# class EventRegistrationViewSet(viewsets.ModelViewSet):
#     queryset = EventRegistration.objects.all()
#     serializer_class = EventRegistrationSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     @action(detail=False, methods=['post'], url_path="events/(?P<event_id>[^/.]+)/register")
#     def register(self, request, event_id=None):

#         try:
#             event = SpecialEvent.objects.get(pk=event_id)
#         except SpecialEvent.DoesNotExist:
#             return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

#         user = request.user

#         if EventRegistration.objects.filter(event=event, user=user).exists():
#             return Response({"message": "You have already registered for this event."}, status=status.HTTP_400_BAD_REQUEST)
#         registration = EventRegistration.objects.create(event=event, user=user)
#         return Response({"message": "Successfully registered for the event.", "event": event.title}, status=status.HTTP_201_CREATED)

# class FeedbackViewSet(viewsets.ModelViewSet):
#     queryset = Feedback.objects.all()
#     serializer_class = FeedbackSerializer
#     permission_classes = [permissions.IsAuthenticated]


@api_view(['POST'])
def send_task_email(request, routine_id):
    try:
        routine = CareRoutine.objects.get(id=routine_id)
        zookeeper = routine.zookeeper

        if not zookeeper:
            return Response({"error": "No assigned zookeeper"}, status=status.HTTP_400_BAD_REQUEST)

        send_mail(
            subject=f"Task Notification: {routine.animal.name}",
            message=f"Dear {zookeeper.user.username},\n\n"
                    f"You have a new task:\n"
                    f"- Date: {routine.date}\n"
                    f"- Feeding Time: {routine.feeding_time}\n"
                    f"- Diet: {routine.diet_type}\n"
                    f"- Medical Needs: {routine.medical_needs}\n\n"
                    f"Please complete this task on time.\n\n"
                    f"Best,\nZoo Management",
            from_email="noreply@zoo.com",
            recipient_list=[zookeeper.email],
            fail_silently=False,
        )

        return Response({"message": "Email sent successfully!"}, status=status.HTTP_200_OK)

    except CareRoutine.DoesNotExist:
        return Response({"error": "Care Routine not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def complete_task(request, log_id):
    try:
        log = ActivityLog.objects.get(id=log_id)
        if log.zookeeper.user != request.user:
            return Response({"error": "You are not authorized to complete this task"}, status=403)
        log.status = "Completed"
        log.completion_time = now() 
        log.save()
        return Response({"message": "Task marked as completed!"}, status=200)
    except ActivityLog.DoesNotExist:
        return Response({"error": "Activity log not found"}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_tasks(request):
    if request.user.is_authenticated:
        try:
            zookeeper = request.user.zookeeper
        except :
            return Response([])
        tasks = ActivityLog.objects.filter(zookeeper=zookeeper)
        serializer = ActivityLogSerializer(tasks, many=True)
        return Response(serializer.data)
    return Response({"error": "Unauthorized"}, status=401)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def apply_membership(request):
#     serializer = MembershipApplicationSerializer(data=request.data, context={'request': request})
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message': 'Membership applied successfully'}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from .models import Membership
from .serializers import (
    UserSerializer,
    MembershipSerializer
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import timedelta
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# def get_membership_details(tier: str):
#     if tier == 'Basic':
#         return 50.00, "Basic membership benefits: Access to limited features."
#     elif tier == 'Premium':
#         return 100.00, "Premium membership benefits: Access to most features with priority support."
#     elif tier == 'VIP':
#         return 200.00, "VIP membership benefits: All features, exclusive events and dedicated support."
#     return 50.00, "Basic membership benefits: Access to limited features."

# class ApplyMembershipView(generics.CreateAPIView):
#     # permission_classes = [permissions.IsAuthenticated]
#     # permission_classes = [permissions.AllowAny]
#     serializer_class = MembershipSerializer

#     def perform_create(self, serializer):
#         tier = serializer.validated_data.get('tier')
#         cost, benefits = get_membership_details(tier)
#         expiry_date = now().date() + timedelta(days=365)
#         # 如果用户已存在会员记录，根据业务可以选择更新或拒绝重复申请
#         serializer.save(
#             user=self.request.user,
#             cost=cost,
#             benefits=benefits,
#             expiry_date=expiry_date,
#             # 如果想默认初始状态为未激活，管理员审核后再设置 active=True，可以这样处理：
#             active=False
#         )
# class MembershipListView(generics.ListAPIView):
#     # permission_classes = [permissions.IsAuthenticated, IsAdminUser]
#     # permission_classes = [permissions.AllowAny]
#     queryset = Membership.objects.all()
#     serializer_class = MembershipSerializer

# class MembershipUpdateView(generics.UpdateAPIView):
#     # permission_classes = [permissions.IsAuthenticated, IsAdminUser]
#     # permission_classes = [permissions.AllowAny]
#     queryset = Membership.objects.all()
#     serializer_class = MembershipAdminSerializer


def get_membership_details(tier: str):
    membership_data = {
        "Basic": (50.00, "Basic membership benefits: Access to limited features."),
        "Premium": (100.00, "Premium membership benefits: Access to most features with priority support."),
        "VIP": (200.00, "VIP membership benefits: All features, exclusive events and dedicated support.")
    }
    return membership_data.get(tier, (50.00, "Basic membership benefits: Access to limited features."))
@permission_classes([IsAuthenticated])
class ApplyMembershipView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MembershipSerializer

    def create(self, request, *args, **kwargs):
        # 参考 get_user_tasks 先检查用户是否已登录
        if not request.user.is_authenticated:
            return Response({"error": "You must be logged in to apply for membership."},
                            status=status.HTTP_401_UNAUTHORIZED)
        
        user = request.user

        # 获取 tier 参数
        tier = request.data.get('tier')
        if not tier:
            return Response({"error": "Membership tier is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        cost, benefits = get_membership_details(tier)
        expiry_date = now().date() + timedelta(days=365)
        
        try:
            # 尝试更新或创建会员记录，类似于 get_user_tasks 的异常捕获机制
            membership, created = Membership.objects.update_or_create(
                user=user,
                defaults={
                    "tier": tier,
                    "cost": cost,
                    "benefits": benefits,
                    "expiry_date": expiry_date,
                    "active": False
                }
            )
        except Exception as e:
            raise ValidationError({"error": str(e)})
        
        return Response({
            "message": "Membership applied successfully" if created else "Membership updated",
            "membership": MembershipSerializer(membership).data
        }, status=status.HTTP_200_OK)

class MembershipListView(generics.ListAPIView):
    # 同样，如果允许匿名访问，则需要手动处理验证
    # permission_classes = [permissions.AllowAny]
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

class MembershipUpdateView(generics.UpdateAPIView):
    # 同 MembershipListView，一般建议仅管理员才能更新会员状态
    # permission_classes = [permissions.AllowAny]
    queryset = Membership.objects.all()
    serializer_class = MembershipAdminSerializer

class UserMembershipView(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = MembershipSerializer

    def get_object(self):
        return self.request.user.membership 















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