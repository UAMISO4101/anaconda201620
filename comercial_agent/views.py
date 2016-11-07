import json
import os

import django
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse


# Create your views here.
from rest_framework import status
from rest_framework.authtoken.models import Token

from .models import *

from comercial_agent.models import Notification, Sound, Song



def index(request):
    return render(request, 'comercial_agent/index.html')


def create_artist_user(request):
    if request.method == 'POST':
        user_json = json.loads(request.body.decode("utf-8"))
        user = django.contrib.auth.models.User.objects.create_user(username=user_json['username'],
                                                                   password=user_json['password'],
                                                                   first_name=user_json['names'],
                                                                   last_name=user_json['surname'],
                                                                   email=user_json['email'])

        token = Token.objects.create(user=user['username'])
        print(token)

        artist = Artist(
            user=user,
            profile_picture=user_json['photo'],
            artistic_name=user_json['nickname'],
            account_number=user_json['accountNumber'],
            address=user_json['address'],
            city=user_json['city'],
            country=user_json['country'],
            telephone=user_json['phone']
        )
        artist.save()


@csrf_exempt
def edit_notification(request,notification_id):
    if request.method == 'PUT':
        notification_json = json.loads(request.body.decode("utf-8"))
        Notification.objects.filter(pk=notification_id).update(
                              name=notification_json['name'],
                              initial_date=notification_json['initialDate'],
                              closing_date=notification_json['closingDate'],
                              description=notification_json['description'],
                              notification_type=notification_json['notificationType']
                            )

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
            pieces = RequestedPiece.objects.filter(notification_id=notification.id).order_by(('id'))
            dict_notification = notification.as_dict();
            dict_pieces = []
            for piece in pieces:
                dict_pieces.append({'id': piece.id, 'name': piece.name, 'features': piece.features})

            dict_notification['request'] = dict_pieces
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

            for piece in notification_json['request']:
                piece_model = RequestedPiece(name=piece['name'],
                                             features=piece['features'])

                piece_model.notification = Notification.objects.get(pk=notification_model.pk)
                piece_model.save()


            return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_open_notifications(request):
    if request.method == 'GET':
        notifications_model = Notification.objects.filter(notification_state=Notification.PUBLISHED)

        notifications_array = []

        for notification in notifications_model:
            pieces_model = RequestedPiece.objects.filter(notification_id=notification.id).order_by(('id'))
            dict_notification = notification.as_dict();
            dict_piece = []
            for piece in pieces_model:
                dict_piece.append({'id': piece.id, 'name': piece.name, 'features': piece.features})

            dict_notification['request'] = dict_piece
            notifications_array.append(dict_notification)

        return JsonResponse({'notifications': notifications_array}, safe=False)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_artworks(request,artwork_type,artwork_filter):
    if request.method == 'GET':
        artworks_array = []
        sounds_model = None
        songs_model = None
        albums_model = None

        if artwork_filter == "all":
            if artwork_type == "song":
                songs_model = Song.objects.all()
            elif artwork_type == "sound":
                sounds_model = Sound.objects.all()
            elif artwork_type == "album":
                albums_model = Album.objects.all()

        elif artwork_filter == "rating":
            if artwork_type == "song":
                songs_model = Song.objects.filter(averageRating__gte=4).order_by('-averageRating')
            elif artwork_type == "sound":
                sounds_model = Sound.objects.filter(averageRating__gte=4).order_by('-averageRating')
            elif artwork_type == "album":
                albums_model = Album.objects.filter(averageRating__gte=4).order_by('-averageRating')

        elif artwork_filter == "recent":
            if artwork_type == "song":
                songs_model = Song.objects.order_by('created_at')[:3]
            elif artwork_type == "sound":
                sounds_model = Sound.objects.order_by('created_at')[:3]
            elif artwork_type == "album":
                albums_model = Album.objects.order_by('created_at')[:3]

        else:
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
            #return JsonResponse({'status':'false','message':message}, status=status.HTTP_400_BAD_REQUEST)

        if artwork_type == "song":
            for song in songs_model:
                song_id = song.pk
                song_name = song.name
                song_type = 'Song'
                song_artist = song.collection.artist.artistic_name
                song_rating = song.averageRating
                song_likes = song.likesCount
                song_length = song.length
                song_cover = os.environ.get('MEDIA_URL') + str(song.cover)
                song_url = os.environ.get('MEDIA_URL') + str(song.contentUrl)
                song_soundtrack = {"name":song_artist, "song":song_name}

                song_record = {"id": song_id, "sound": song_name, "type": song_type, "artist": song_artist,
                               "rating": song_rating, "likes": song_likes, "length": song_length, "cover": song_cover,
                               "url": song_url, "soundtrack": song_soundtrack}

                artworks_array.append(song_record)

        elif artwork_type == "sound":
            for sound in sounds_model:
                sound_id = sound.pk
                sound_name = sound.name
                sound_type = sound.type.name
                sound_artist = sound.collection.artist.artistic_name
                sound_rating = sound.averageRating
                sound_likes = sound.likesCount
                sound_length = sound.length
                sound_cover = os.environ.get('MEDIA_URL') + str(sound.cover)
                sound_url = os.environ.get('MEDIA_URL') + str(sound.contentUrl)
                sound_soundtrack = {"name": sound_artist, "song": sound_name}

                sound_record = {"id":sound_id,"sound":sound_name,"type":sound_type,"artist":sound_artist,"rating":sound_rating,
                                "likes":sound_likes,"length":sound_length,"cover":sound_cover, "url": sound_url, "soundtrack": sound_soundtrack}

                artworks_array.append(sound_record)

        elif artwork_type == "album":
            for album in albums_model:
                album_id = album.pk
                album_name = album.name
                album_type = 'Album'
                album_artist = album.collection.artist.artistic_name
                album_rating = album.averageRating
                album_likes = album.likesCount
                album_length = album.length
                album_cover = os.environ.get('MEDIA_URL') + str(album.cover)
                album_url = os.environ.get('MEDIA_URL') + str(album.contentUrl)
                album_soundtrack = {"name": album_artist, "song": album_name}

                album_record = {"id": album_id, "sound": album_name, "type": album_type, "artist": album_artist,
                               "rating": album_rating, "likes": album_likes, "length": album_length, "cover": album_cover,
                                "url": album_url, "soundtrack": album_soundtrack}

                artworks_array.append(album_record)

        artworks_response = artworks_array

        print(artworks_response)

        return JsonResponse(dict(sounds=artworks_response))

    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

def to_songs_array(songs_model):
    songs_array = []

    for song in songs_model:
        song_id = song.pk
        song_name = song.name
        song_type = 'Song'
        song_artist = song.collection.artist.artistic_name
        song_rating = song.averageRating
        song_likes = song.likesCount
        song_length = song.length
        song_cover = os.environ.get('MEDIA_URL') + str(song.cover)

        song_record = {"id": song_id, "sound": song_name, "type": song_type, "artist": song_artist,
                       "rating": song_rating, "likes": song_likes, "length": song_length, "cover": song_cover}

        songs_array.append(song_record)


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

@csrf_exempt
def get_artworks_by_artist(request,user_id):
    if request.method == 'GET':
        artworks_array = []
        artist_id = Artist.objects.get(user_id=user_id).pk
        artwork_collection_id = ArtworkCollection.objects.get(artist_id=artist_id).pk
        artworks = Artwork.objects.filter(collection_id=artwork_collection_id).order_by('created_at').values_list('id',flat=True)
        for artwork in artworks:
            artwork_item = Artwork.objects.get(id=artwork)
            artwork_json ={"value": artwork, "label": artwork_item.artwork_type+' - '+artwork_item.name}
            artworks_array.append(artwork_json)

        return JsonResponse(dict(artworks=artworks_array))
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def postulate_artwork(request):
    if request.method == 'POST':
        postulation_json = json.loads(request.body.decode("utf-8"))

        user_id = postulation_json['proposal']['id_user']
        notification_id = postulation_json['proposal']['id_notification']

        artist_info = Artist.objects.get(user_id=user_id)
        notification_info = Notification.objects.get(id=notification_id)

        postulation_info = Postulation(artist=artist_info, notification=notification_info)
        postulation_info.save()

        for artwork in postulation_json['proposal']['pairs']:
            id_feature = artwork['id_feature']
            id_artwork = artwork['id_artwork']

            feature_info=RequestedPiece.objects.get(id=id_feature)
            artwork_info=Artwork.objects.get(id=id_artwork)

            postulated_artwork= PostulatedArtwork(requestedPiece=feature_info,artwork=artwork_info,postulation=postulation_info)
            postulated_artwork.save()

        return HttpResponse(status=status.HTTP_201_CREATED)
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
def get_postulations_by_notification(request,notification_id):
    if request.method == 'GET':
        postulation_array_json = []
        postulation_array = Postulation.objects.filter(notification_id=notification_id).values_list('id',flat=True)

        for postulation in postulation_array:
            audio_array=[]
            postulation_info = Postulation.objects.get(id=postulation)

            artist_info = Artist.objects.get(id=postulation_info.artist.id)
            artist_info_json = {"id":artist_info.id,"name":artist_info.artistic_name}

            postulated_artwork_info = PostulatedArtwork.objects.filter(postulation_id= postulation)
            for postulated_artwork in postulated_artwork_info:

                artwork_info = Artwork.objects.get(id= postulated_artwork.artwork.id)
                artist_info_artwork_json = {"name": artist_info.artistic_name, "song": artwork_info.name}
                artwork_info_json = {"url": os.environ.get('MEDIA_URL') + str(artwork_info.contentUrl), "cover": os.environ.get('MEDIA_URL') + str(artwork_info.cover), "artist":artist_info.artistic_name, "soundtrack":artist_info_artwork_json}

                audio_array.append(artwork_info_json)

            postulation_info_json = {"id": postulation,"artist":artist_info.artistic_name,"audios":audio_array}
            postulation_array_json.append(postulation_info_json)

        return JsonResponse(dict(proposals=postulation_array_json))
    else:
        return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
