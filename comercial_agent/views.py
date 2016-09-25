import json

from django.http import HttpResponse
from rest_framework import generics
from django.shortcuts import render

# Create your views here.
from rest_framework import status

from comercial_agent.models import ArtworkRequest, Notification


def index(request):
    return render(request, 'comercial_agent/index.html')

def create_notification(request):
    if request.method == 'POST':
        if request.is_ajax():
            notification_json = json.loads(request.body.decode("utf-8"))

            notification_model = Notification(name=notification_json['name'],
                                              initial_date=notification_json['initialDate'],
                                              closing_date=notification_json['closingDate'],
                                              description=notification_json['description'],
                                              notification_type=notification_json['notificationType'])

            notification_pk = notification_model.save()

            for request in notification_json['requests']:
                request_model = ArtworkRequest(name=request['name'],
                                                features=request['features'])

                request_model.notification = Notification.objects.get(pk=notification_pk)
                request_model.save()


            return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


