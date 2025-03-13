from django.utils.timezone import localdate
from django.forms import ValidationError
from rest_framework import viewsets, permissions
from .models import Animal, Habitat,Zookeeper, CareRoutine, ActivityLog,Membership, SpecialEvent, EventRegistration, Feedback
from .serializers import UserRegisterSerializer,AnimalSerializer, HabitatSerializer,ZookeeperSerializer, CareRoutineSerializer,  ActivityLogSerializer,MembershipSerializer,MembershipAdminSerializer,MembershipSerializer, SpecialEventSerializer, EventRegistrationSerializer, FeedbackSerializer

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

@api_view(['POST'])
def register_user(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=201)
    return Response(serializer.errors, status=400)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from .models import Membership
from .serializers import (
    UserSerializer,
    MembershipSerializer
)
from rest_framework.permissions import IsAuthenticated
from datetime import timedelta
from rest_framework import generics, permissions


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=201)
        return Response(serializer.errors, status=400)

def get_membership_details(tier: str):
    membership_data = {
        "Basic": (50.00, "Basic membership benefits: Access to limited features."),
        "Premium": (100.00, "Premium membership benefits: Access to most features with priority support."),
        "VIP": (200.00, "VIP membership benefits: All features, exclusive events and dedicated support.")
    }
    return membership_data.get(tier, (50.00, "Basic membership benefits: Access to limited features."))


@permission_classes([IsAuthenticated])
class ApplyMembershipView(generics.CreateAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = MembershipSerializer

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"You must be logged in"},
                            status=401)
        user = request.user
        tier = request.data.get('tier')
        if not tier:
            return Response({"error": "Membership tier is required."},
                            status=400)

        cost, benefits = get_membership_details(tier)
        expiry_date = now().date() + timedelta(days=30)
        
        try:
            membership, created = Membership.objects.update_or_create(
                user=user,
                defaults={
                    "tier": tier,
                    "cost": cost,
                    "benefits": benefits,
                    "expiry_date": expiry_date,
                    "start_date": localdate(),
                    "active": False
                }
            )
        except Exception as e:
            raise ValidationError({"error": str(e)})
        
        return Response({
            "message": "Membership applied successfully" if created else "Membership updated",
            "membership": MembershipSerializer(membership).data}, status=status.HTTP_200_OK)
class MembershipListView(generics.ListAPIView):
    # permission_classes = [permissions.AllowAny]
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

class MembershipUpdateView(generics.UpdateAPIView):
    # permission_classes = [permissions.AllowAny]
    queryset = Membership.objects.all()
    serializer_class = MembershipAdminSerializer

class UserMembershipView(generics.RetrieveAPIView):
    # permission_classes = [permissions.IsAuthenticated]
    serializer_class = MembershipSerializer

    def get_object(self):
        return self.request.user.membership 

class IsEventCreatorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.created_by == request.user

class SpecialEventViewSet(viewsets.ModelViewSet):
    queryset = SpecialEvent.objects.all().order_by('-event_date')
    serializer_class = SpecialEventSerializer
    # permission_classes = [permissions.IsAuthenticated, IsEventCreatorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def available(self, request):
        user = request.user
        try:
            membership = user.membership
        except Membership.DoesNotExist:
            return Response({"detail": "Membership not found."}, status=400)

        events = SpecialEvent.objects.filter(min_tier__lte=membership.tier)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):

        registration = self.get_object()
        event = registration.event
        if event.created_by != request.user:
            return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
        new_status = request.data.get('status')
        if new_status not in dict(EventRegistration.STATUS_CHOICES).keys():
            return Response({"detail": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)
        registration.status = new_status
        registration.save()
        serializer = self.get_serializer(registration)
        return Response(serializer.data)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)







