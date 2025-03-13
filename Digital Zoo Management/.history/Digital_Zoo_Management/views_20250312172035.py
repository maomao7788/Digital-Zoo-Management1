from rest_framework import viewsets, permissions
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog,Membership, SpecialEvent, EventRegistration, Feedback
from .serializers import MembershipApplicationSerializer,UserRegisterSerializer,AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer,  ActivityLogSerializer ,MembershipSerializer, SpecialEventSerializer, EventRegistrationSerializer, FeedbackSerializer
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
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated]

class SpecialEventViewSet(viewsets.ModelViewSet):
    queryset = SpecialEvent.objects.all()
    serializer_class = SpecialEventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        registration = self.get_object()
        registration.status = 'Approved'
        registration.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        registration = self.get_object()
        registration.status = 'Rejected'
        registration.save()
        return Response({'status': 'rejected'})

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]


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
        zookeeper = request.user.zookeeper
        tasks = ActivityLog.objects.filter(zookeeper=zookeeper)
        serializer = ActivityLogSerializer(tasks, many=True)
        return Response(serializer.data)
    return Response({"error": "Unauthorized"}, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_membership(request):
    serializer = MembershipApplicationSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Membership applied successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
from .models import Membership, SpecialEvent, EventRegistration, Feedback
from .serializers import (
    UserSerializer, MembershipSerializer, ProfileSerializer,
    SpecialEventSerializer, EventRegistrationSerializer, FeedbackSerializer
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# 用户注册接口
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 会员申请接口
class MembershipApplyView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if hasattr(request.user, 'membership'):
            return Response({'error': 'Membership already exists'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = MembershipSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Membership applied successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 个人信息展示
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

# 用户可查看符合其会员等级的活动列表
class EventListView(APIView):
    permission_classes = [IsAuthenticated]
    
    # 定义会员等级排序（假设 Basic < Premium < VIP）
    TIER_RANKING = {
        'Basic': 1,
        'Premium': 2,
        'VIP': 3
    }
    
    def get(self, request):
        if not hasattr(request.user, 'membership'):
            return Response({'error': 'No membership found'}, status=status.HTTP_400_BAD_REQUEST)
        user_tier = request.user.membership.tier
        user_rank = self.TIER_RANKING.get(user_tier, 0)
        events = SpecialEvent.objects.all()
        def event_visible(event):
            event_rank = self.TIER_RANKING.get(event.min_tier, 0)
            return user_rank >= event_rank
        visible_events = [event for event in events if event_visible(event)]
        serializer = SpecialEventSerializer(visible_events, many=True)
        return Response(serializer.data)

# 用户申请参加活动
class EventRegistrationView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, event_id):
        data = {'event': event_id, 'user': request.user.id}
        serializer = EventRegistrationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registered for event successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 用户活动完成后提交反馈
class FeedbackView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, event_id):
        data = request.data.copy()
        data['event'] = event_id
        data['user'] = request.user.id
        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Feedback submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 管理员：创建活动
class AdminCreateEventView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        serializer = SpecialEventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Event created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 管理员：查看某活动下所有报名信息
class AdminEventRegistrationsView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, event_id):
        registrations = EventRegistration.objects.filter(event__id=event_id)
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

# 管理员：批准报名
class AdminApproveRegistrationView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, registration_id):
        try:
            registration = EventRegistration.objects.get(id=registration_id)
        except EventRegistration.DoesNotExist:
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)
        registration.status = 'Approved'
        registration.save()
        return Response({'message': 'Registration approved'})

# 管理员：拒绝报名
class AdminRejectRegistrationView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, registration_id):
        try:
            registration = EventRegistration.objects.get(id=registration_id)
        except EventRegistration.DoesNotExist:
            return Response({'error': 'Registration not found'}, status=status.HTTP_404_NOT_FOUND)
        registration.status = 'Rejected'
        registration.save()
        return Response({'message': 'Registration rejected'})

# 管理员：查看某活动下所有反馈
class AdminEventFeedbacksView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request, event_id):
        feedbacks = Feedback.objects.filter(event__id=event_id)
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)




















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