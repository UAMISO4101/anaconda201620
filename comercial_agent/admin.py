from django.contrib import admin

# Register your models here.
from comercial_agent.models import Artwork, Sound

admin.site.register(Artwork)
admin.site.register(Sound)
