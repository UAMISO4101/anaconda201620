from django.contrib import admin

# Register your models here.
from comercial_agent.models import Artwork, Sound, SoundType, Artist

admin.site.register(Artwork)
admin.site.register(Sound)
admin.site.register(SoundType)
admin.site.register(Artist)
