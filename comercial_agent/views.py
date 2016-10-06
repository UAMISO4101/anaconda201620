import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
from rest_framework import status
from .models import *
from comercial_agent.models import ArtworkRequest, Notification, Sound



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


def notification_json(request):
    notifications = Notification.objects.order_by(('initial_date'))
    dict_notification = [notification.as_dict() for notification in notifications]

    return JsonResponse({'notifications': dict_notification}, safe=False)


def get_artworks(request):

    print ('Entra a get artworks')

    sounds_response = {}
    sounds_array = []

    sounds_model = Sound.objects.all()

    for sound in sounds_model:
        sound_id = sound.pk
        sound_name = sound.name
        sound_type = sound.type.name
        sound_artist = sound.collection.artist.artistic_name
        sound_rating = sound.averageRating
        sound_likes = sound.likesCount

        sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,"likes":sound_likes}

        sounds_array.append(sound_record)

    sounds_response = sounds_array

    print(sounds_response)
    print(dict(sounds=sounds_response))
    return JsonResponse(dict(sounds=sounds_response))
