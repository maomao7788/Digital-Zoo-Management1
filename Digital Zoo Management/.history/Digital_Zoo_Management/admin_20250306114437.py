from django.contrib import admin
from .models import Habitat, Animal,Zookeeper,CareRoutine,ActivityLog

admin.site.register(Habitat)
admin.site.register(Animal)
admin.site.register(Zookeeper)
admin.site.register(CareRoutine)
admin.site.register(ActivityLog)


# @admin.register(Habitat)
# class HabitatAdmin(admin.ModelAdmin):
#     list_display = ('name', 'size', 'climate', 'suitable_species')  
# @admin.register(Animal)
# class AnimalAdmin(admin.ModelAdmin):
#     list_display = ('name', 'species', 'diet', 'lifespan', 'behaviour', 'habitat')
