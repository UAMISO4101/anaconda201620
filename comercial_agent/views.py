import json

from django.http import HttpResponse
from django.http import JsonResponse
from django.template.defaultfilters import floatformat
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.shortcuts import render

# Create your views here.
from rest_framework import status

from comercial_agent.models import ArtworkRequest, Notification, Sound


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


def get_artworks(request):
    if request.method == 'POST':
        if request.is_ajax():

            sounds_response = {}
            sounds_array = []

            sounds_model = Sound.objects.all()

            for sound in sounds_model:
                sound_id = sound.pk
                sound_name = sound.name
                sound_type = sound.type.name
                sound_artist = sound.artists.get(0).name
                sound_rating = {{ sound.averageRating|floatformat:"0" }}
                sound_likes = sound.likesCount

                print (sound_id, sound_name, sound_type, sound_artist, sound_rating, sound_likes)

                sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,"likes":sound_likes}

                print (sound_record)

                sounds_array.append(sound_record)

            sounds_response = sounds_array

            return JsonResponse(sounds_response)
