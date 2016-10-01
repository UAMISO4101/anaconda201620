from django.contrib import admin

# Register your models here.
from comercial_agent.models import Artwork, Sound, SoundType, Artist, ArtworkCollection

admin.site.register(Artwork)
admin.site.register(Sound)
admin.site.register(SoundType)
admin.site.register(Artist)
admin.site.register(ArtworkCollection)
