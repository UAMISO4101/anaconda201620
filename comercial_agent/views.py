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

from comercial_agent.models import Artwork, Notification, Sound, Song




def index(request):
    return render(request, 'comercial_agent/index.html')



@csrf_exempt
def edit_notification(request,notification_id):
    if request.method == 'PUT':
        notification_json = json.loads(request.body.decode("utf-8"))
        notification_model = Notification.objects.filter(pk=notification_id).update(
                              name=notification_json['name'],
                              initial_date=notification_json['initialDate'],
                              closing_date=notification_json['closingDate'],
                              description=notification_json['description'],
                              notification_type=notification_json['notificationType']
                            )

        # import pdb; pdb.set_trace()
        RequestedPiece.objects.filter(notification_id=notification_id).delete()
        for piece in notification_json['request']:
            piece_model = RequestedPiece(name=piece['name'],
                                         features=piece['features'])

            piece_model.notification = Notification.objects.get(pk=notification_id)
            piece_model.save()

        return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def notification_json(request):
    if request.method == 'GET':
        notifications = Notification.objects.order_by(('initial_date'))
        dict_notifications = []

        for notification in notifications:
            requests = ArtworkRequest.objects.filter(notification_id=notification.id).order_by(('id'))
            dict_notification = notification.as_dict();
            dict_request = []
            for request in requests:
                dict_request.append({'name': request.name, 'features': request.features})

            dict_notification['request'] = dict_request
            dict_notifications.append(dict_notification)

        return JsonResponse({'notifications': dict_notifications}, safe=False)
    elif request.method == 'POST':
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

def get_open_notifications(request):
    notifications_model = Notification.objects.filter(notification_state=Notification.PUBLISHED)

    notifications_array = []

    for notification in notifications_model:
        pieces_model = RequestedPiece.objects.filter(notification_id=notification.id).order_by(('id'))
        dict_notification = notification.as_dict();
        dict_piece = []
        for piece in pieces_model:
            dict_piece.append({'name': piece.name, 'features': piece.features})

        dict_notification['request'] = dict_piece
        notifications_array.append(dict_notification)

    return JsonResponse({'notifications': notifications_array}, safe=False)


def get_artworks(request,artwork_type):
    if request.method == 'GET':
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
            sounds_model = Artwork.objects.order_by('created_at')[:3]

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
            sound_length = sound.length
            sound_cover = sound.cover

            sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,"likes":sound_likes,"length":sound_length,"cover":sound_cover}

            artworks_array.append(sound_record)

        for song in songs_model:
            song_id = song.pk
            song_name = song.name
            song_type = 'Song'
            song_artist = song.collection.artist.artistic_name
            song_rating = song.averageRating
            song_likes = song.likesCount
            song_length = song.length
            song_cover = song.cover

            song_record = {"id":song_id,"sound":song_name,"type":song_type,"artist":song_artist,"rating":song_rating,"likes":song_likes,"length":song_length,"cover":song_cover}

            artworks_array.append(song_record)

        artworks_response = artworks_array

        print(artworks_response)

        return JsonResponse(dict(sounds=artworks_response))


@csrf_exempt
def edit_notification_state(request,notification_id):
    if request.method == 'PUT':
        notification_json = json.loads(request.body.decode("utf-8"))
        Notification.objects.filter(pk=notification_id).update(
            notification_state=notification_json['notificationState']
        )

        return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
