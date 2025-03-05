from django.db import models

class Habitat(models.Model):
    name = models.CharField(max_length=50, unique=True)
    size = models.CharField(max_length=20)
    climate = models.CharField(max_length=20)
    suitable_species = models.JSONField()  
class Animal(models.Model):
    DIET_CHOICES = [
        ('Carnivore', '肉食'),
        ('Herbivore', '草食'),
        ('Omnivore', '杂食'),
    ]
    species = models.CharField(max_length=50)
    diet = models.CharField(max_length=20, choices=DIET_CHOICES)
    lifespan = models.IntegerField()
    behaviour = models.CharField(max_length=50)
    habitat = models.ForeignKey(Habitat, on_delete=models.SET_NULL, null=True)