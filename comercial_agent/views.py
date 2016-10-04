import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.template.defaultfilters import floatformat
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.shortcuts import render
from datetime import datetime, timedelta


# Create your views here.
from rest_framework import status

from comercial_agent.models import ArtworkRequest, Notification, Sound, Song


def index(request):
    return render(request, 'comercial_agent/index.html')

@csrf_exempt
def create_notification(request):
    if request.method == 'POST':
        if request.is_ajax():
            notification_json = json.loads(request.body.decode("utf-8"))

            notification_model = Notification(name=notification_json['name'],
                                              initial_date=notification_json['initialDate'],
                                              closing_date=notification_json['closingDate'],
                                              description=notification_json['description'],
                                              notification_type=notification_json['notificationType'])

            notification_model.save()

            for request in notification_json['request']:
                request_model = ArtworkRequest(name=request['name'],
                                                features=request['features'])

                request_model.notification = Notification.objects.get(pk=notification_model.pk)
                request_model.save()


            return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


def get_artworks(request,artwork_type):

    sounds_response = {}
    sounds_array = []
    sounds_model = None
    if artwork_type == "":
        sounds_model = Sound.objects.all()
    elif artwork_type == "popular":
        sounds_model = Sound.objects.filter(ratingCount >= 4)
    elif artwork_type == "recent":
        sounds_model = Sound.objects.order_by('created_at')[:10]
    else:
        return JsonResponse({'status':'false','message':message}, status=400)

    for sound in sounds_model:
        sound_id = sound.pk
        sound_name = sound.name
        sound_type = sound.type.name
        sound_artist = sound.collection.artist.artistic_name
        sound_rating = sound.averageRating
        sound_likes = sound.likesCount

        sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,"likes":sound_likes}

        artworks_array.append(sound_record)

    songs_model = Song.objects.all()

    for song in songs_model:
        song_id = song.pk
        song_name = song.name
        song_type = 'Song'
        song_artist = song.collection.artist.artistic_name
        song_rating = song.averageRating
        song_likes = song.likesCount

        song_record = {"id":song_id,"sound":song_name,"type":song_type,"artist":song_artist,"rating":song_rating,"likes":song_likes}

        artworks_array.append(song_record)

    artworks_response = artworks_array

    print(artworks_response)

    return JsonResponse(dict(sounds=artworks_response))
