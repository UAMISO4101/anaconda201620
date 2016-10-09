import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta


# Create your views here.
from rest_framework import status
from .models import *

from comercial_agent.models import Artwork, ArtworkRequest, Notification, Sound, Song




def index(request):
    return render(request, 'comercial_agent/index.html')

@csrf_exempt
def create_notification(request):
    if request.method == 'POST':
        if request.is_ajax():
            notification_json = json.loads(request.body.decode("utf-8"))

            print(notification_json)
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
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


def notification_json(request):
    notifications = Notification.objects.order_by(('initial_date'))
    dict_notification = [notification.as_dict() for notification in notifications]

    return JsonResponse({'notifications': dict_notification}, safe=False)


def get_artworks(request,artwork_type):

    sounds_response = {}
    sounds_array = []
    artworks_array = []
    sounds_model = None
    songs_model = None
    if artwork_type == "all":
        sounds_model = Sound.objects.all()
        songs_model = Song.objects.all()
    elif artwork_type == "rating":
        sounds_model = Sound.objects.filter(averageRating__gte=3)
        songs_model = Song.objects.filter(averageRating__gte=3)
    elif artwork_type == "recent":
        query = "SELECT TOP 10 \
            COUNT(d.OrderID) AS total, d.ProductID, p.Title \
            FROM OrderDetails d \
            INNER JOIN Products p ON d.ProductID = p.ProductID \
            WHERE d.SellerID = 'xxx' \
            GROUP by d.ProductID, p.Title\
            ORDER BY COUNT(d.OrderID) DESC"
        sounds_model = Artwork.objects.order_by('created_at')[:3]
        # Person.objects.raw('SELECT * FROM some_other_table', translations=name_map)

    else:
        return JsonResponse({'status':'false','message':message}, status=400)

    for sound in sounds_model:
        # import pdb; pdb.set_trace()
        sound_id = sound.pk
        sound_name = sound.name
        sound_type = sound.type.name
        sound_artist = sound.collection.artist.artistic_name
        sound_rating = sound.averageRating
        sound_likes = sound.likesCount

        sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,"likes":sound_likes}

        artworks_array.append(sound_record)

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
