from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (register_user,
                    HabitatViewSet, AnimalViewSet,ZookeeperViewSet, CareRoutineViewSet, 
                    ActivityLogViewSet,UserMembershipView, UserViewSet,UserViewSet, send_task_email,complete_task,  get_user_tasks,ApplyMembershipView, MembershipListView, MembershipUpdateView
                    ,SpecialEventViewSet, MembershipViewSet,
                    EventRegistrationViewSet, FeedbackViewSet,)
# apply_membership,MembershipApplyView, MembershipListView, MembershipActivateView,
# MembershipViewSet, SpecialEventViewSet, MembershipViewSet,
#                     EventRegistrationViewSet, FeedbackViewSet,
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# from .views import RegisterView 
router = DefaultRouter()
router.register(r'habitats', HabitatViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'zookeepers', ZookeeperViewSet)
router.register(r'care_routines', CareRoutineViewSet)
router.register(r'activity-logs', ActivityLogViewSet)
# router.register(r'users', UserViewSet)
router.register(r'users', UserViewSet, basename='users') 
# router.register(r'memberships', MembershipViewSet, basename='membership')
# router.register(r'memberships', MembershipViewSet)
# router.register(r'events', SpecialEventViewSet)
# router.register(r'registrations', EventRegistrationViewSet)
# router.register(r'feedbacks', FeedbackViewSet)
# router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/send-task-email/<int:routine_id>/', send_task_email, name='send-task-email'),
    path('api/complete-task/<int:log_id>/', complete_task, name='complete-task'),
    path('api/user-tasks/', get_user_tasks, name='user-tasks'),
    path('api/apply-membership/', ApplyMembershipView.as_view(), name='apply-membership'),
    path('api/memberships/', MembershipListView.as_view(), name='membership-list'),
    path('api/memberships/<int:pk>/', MembershipUpdateView.as_view(), name='membership-update'),
    # path('api/register/', RegisterView.as_view(), name='register'),
    # path('api/apply-membership/', apply_membership, name='apply-membership'),
    # path('api/apply-membership/', MembershipApplyView.as_view(), name='apply-membership'),
    # path('api/membership-list/', MembershipListView.as_view(), name='membership-list'),
    # path('api/<int:pk>/activate-membership/', MembershipActivateView.as_view(), name='activate-membership'),
    path('api/register/', register_user, name='register'),
    path('api/memberships/profile/', UserMembershipView.as_view(), name='user-membership'),

]

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import (
#     apply_membership, register_user,
#     HabitatViewSet, AnimalViewSet, ZookeeperViewSet, CareRoutineViewSet, ActivityLogViewSet,
#     UserViewSet, MembershipViewSet, SpecialEventViewSet, EventRegistrationViewSet, FeedbackViewSet,get_current_user,AdminEventRegistrationsView,
#     send_task_email, complete_task, get_user_tasks
# )
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# router = DefaultRouter()
# router.register(r'habitats', HabitatViewSet)
# router.register(r'animals', AnimalViewSet)
# router.register(r'zookeepers', ZookeeperViewSet)
# router.register(r'care_routines', CareRoutineViewSet)
# router.register(r'activity-logs', ActivityLogViewSet)
# router.register(r'users', UserViewSet, basename='users')  
# router.register(r'memberships', MembershipViewSet)
# router.register(r'events', SpecialEventViewSet)
# router.register(r'registrations', EventRegistrationViewSet, basename='registrations')
# router.register(r'feedbacks', FeedbackViewSet)

# urlpatterns = [
#     path('api/', include(router.urls)),
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('api/send-task-email/<int:routine_id>/', send_task_email, name='send-task-email'),
#     path('api/complete-task/<int:log_id>/', complete_task, name='complete-task'),
#     path('api/user-tasks/', get_user_tasks, name='user-tasks'),
#     path('api/apply-membership/', apply_membership, name='apply-membership'),
    # path('api/register/', register_user, name='register'),

# ]



