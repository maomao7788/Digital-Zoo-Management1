from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
from django.utils.timezone import localdate

class Zookeeper(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    role = models.CharField(max_length=50,null=True)
    qualifications = models.TextField()  
    responsibilities = models.TextField()  
    email = models.CharField(max_length=50,null=True,default= " ")
    def __str__(self):
        return self.user.username

class CareRoutine(models.Model):
    animal = models.ForeignKey('Animal', on_delete=models.CASCADE)
    feeding_time = models.TimeField()  
    diet_type = models.CharField(max_length=50)  
    medical_needs = models.TextField()
    date = models.DateField(default=now)
    zookeeper = models.ForeignKey(Zookeeper,on_delete=models.CASCADE,null=True)
    def __str__(self):
        return f"Routine for {self.animal.name}"

class Habitat(models.Model):
    name = models.CharField(max_length=50, unique=True)
    size = models.IntegerField()
    climate = models.CharField(max_length=20)
    suitable_species = models.JSONField(blank=True, null=True)
    def animals(self):
        return self.animal_set.all() 
    
class Animal(models.Model):
    DIET_CHOICES = [
        ('Carnivore', 'Carnivore'),
        ('Herbivore', 'Herbivore'),
        ('Omnivore', 'Omnivore'),
    ]
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=50)
    diet = models.CharField(max_length=20, choices=DIET_CHOICES)
    lifespan = models.IntegerField()
    behaviour = models.CharField(max_length=50)
    habitat = models.ForeignKey('Habitat', on_delete=models.SET_NULL, null=True, related_name='animals')
    
class ActivityLog(models.Model):
    zookeeper = models.ForeignKey('Zookeeper', on_delete=models.SET_NULL, null=True, blank=True)
    care_routine = models.ForeignKey('CareRoutine', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=[('Assigned', 'Assigned'), ('Completed', 'Completed')], default='Assigned')
    completion_time = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return f"{self.zookeeper.user.username} - {self.status}"
    



class Membership(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='membership')
    start_date = models.DateField(default=localdate)
    expiry_date = models.DateField(default=localdate)
    active = models.BooleanField(default=True)
    cost = models.DecimalField(max_digits=6, decimal_places=2)
    benefits = models.TextField()
    TIER_CHOICES = [
        ('Basic', 'Basic'),
        ('Premium', 'Premium'),
        ('VIP', 'VIP'),
    ]
    tier = models.CharField(max_length=20, choices=TIER_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.tier}"

class SpecialEvent(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    event_date = models.DateTimeField()
    location = models.CharField(max_length=100)
    min_tier = models.CharField(max_length=20, choices=Membership.TIER_CHOICES)
    # min_tier = models.IntegerField(choices=Membership.TIER_CHOICES)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    participants = models.ManyToManyField(User, blank=True, related_name='event_participants')

    def __str__(self):
        return self.title
    

class EventRegistration(models.Model):

    event = models.ForeignKey(SpecialEvent, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.event.title} ({self.status})"

class Feedback(models.Model):
    event = models.ForeignKey(SpecialEvent, on_delete=models.CASCADE, related_name='feedbacks')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback by {self.user.username} for {self.event.title}"

# class EventBooking(models.Model):
#     event = models.ForeignKey(SpecialEvent, on_delete=models.CASCADE, related_name='bookings')
#     member = models.ForeignKey(Membership, on_delete=models.CASCADE, related_name='event_bookings')
#     booking_date = models.DateTimeField(auto_now_add=True)
#     attended = models.BooleanField(default=False)

