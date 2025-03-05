from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now
class Zookeeper(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  
    # name = models.CharField(max_length=50,)
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
    zookeeper = models.ForeignKey(Zookeeper,on_delete=models.SET_NULL,null=True)
    def __str__(self):
        return f"Routine for {self.animal.name}"

class ActivityLog(models.Model):
    zookeeper = models.ForeignKey(Zookeeper, on_delete=models.CASCADE)
    animal = models.ForeignKey('Animal', on_delete=models.CASCADE)
    activity_description = models.TextField() 
    date_time = models.DateTimeField(auto_now_add=True) 
    def __str__(self):
        return f"{self.zookeeper.user.username} - {self.animal.name} - {self.activity_description}"
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

class Task(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    zookeeper = models.ForeignKey(Zookeeper, on_delete=models.CASCADE)
    animal = models.ForeignKey(Animal, on_delete=models.CASCADE)
    description = models.TextField()
    due_date = models.DateField(default=now)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')

    def __str__(self):
        return f"Task for {self.zookeeper.user.username} - {self.animal.name}"