#from django.contrib.auth.models import User
# python manage.py shell << seed.py
import os

import django
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from comercial_agent.models import Artist, ArtworkCollection, SoundType, Genre, Album, Song, Sound, Notification, \
    RequestedPiece, BusinessAgent

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sonidos_libres.settings")


def songs_creator():

    user = django.contrib.auth.models.User.objects.create_user(username='ironmaiden_user', password='ironmaiden1234')
    artist = Artist(
        user = user,
        profile_picture='media/profilePictures/ironmaiden2015bandwlogo_638.jpg',
        artistic_name = 'Iron Maiden',
        account_number = 88889,
        address = 'London 123',
        city = 'London',
        country = 'UK',
        telephone = 784555,
    )
    artist.save()

    collection = ArtworkCollection(
        artist=artist,
    )
    collection.save()

    genre = Genre(
        name='Heavy Metal',
    )
    genre.save()

    #Album1
    album = Album(
        name='Powerslave',
        ratingCount=5,
        likesCount=259,
        dislikesCount=5,
        playsCount=1035,
        averageRating=4,
        collection=collection,
        genre=genre,
        length=3072,
        cover='media/covers/Iron_Maiden_-_Powerslave.jpg',
        artwork_type='ALB',
    )
    album.save()

    song = Song(
        name='Aces High',
        ratingCount=44,
        likesCount=365,
        dislikesCount=7,
        playsCount=2564,
        averageRating=4,
        collection=collection,
        song_album=album,
        length=271,
        artwork_type='SNG',
    )
    song.save()

    song = Song(
        name='Powerslave',
        ratingCount=95,
        likesCount=663,
        dislikesCount=10,
        playsCount=8532,
        averageRating=5,
        collection=collection,
        song_album=album,
        length=432,
        artwork_type='SNG',
    )
    song.save()

    song = Song(
        name='2 Minutes to Midnight',
        ratingCount=63,
        likesCount=542,
        dislikesCount=9,
        playsCount=4712,
        averageRating=3,
        collection=collection,
        song_album=album,
        length=364,
        artwork_type='SNG',
    )
    song.save()

    #Album2
    album = Album(
        name='The Number of the Beast',
        ratingCount=89,
        likesCount=5259,
        dislikesCount=12,
        playsCount=12035,
        averageRating=5,
        collection=collection,
        genre=genre,
        cover='media/covers/IronMaiden_NumberOfBeast.jpg',
        length=2351,
        artwork_type='ALB',
    )
    album.save()

    song = Song(
        name='The Number of the Beast',
        ratingCount=33,
        likesCount=122,
        dislikesCount=2,
        playsCount=6555,
        averageRating=4,
        collection=collection,
        song_album=album,
        length=445,
        artwork_type='SNG',
    )
    song.save()

    song = Song(
        name='Run to the Hills',
        ratingCount=25,
        likesCount=654,
        dislikesCount=8,
        playsCount=5214,
        averageRating=3,
        collection=collection,
        song_album=album,
        length=350,
        artwork_type='SNG',
    )
    song.save()

    song = Song(
        name='Hallowed by Thy Name',
        ratingCount=964,
        likesCount=9421,
        dislikesCount=1,
        playsCount=12547,
        averageRating=5,
        collection=collection,
        song_album=album,
        length=428,
        artwork_type='SNG',
    )
    song.save()



def sounds_creator():

    user = django.contrib.auth.models.User.objects.create_user(username='coke_user', password='coke1234')
    artist = Artist(
        user=user,
        profile_picture='media/profilePictures/coca-cola-02.jpg',
        artistic_name='Coca Cola',
        account_number=555555,
        address='Silver Summer Ave',
        city='Atlanta',
        country='USA',
        telephone=5648521,
    )
    artist.save()

    collection = ArtworkCollection(
        artist=artist,
    )
    collection.save()

    sound_type = SoundType(
        name='Jingle',
    )
    sound_type.save()

    sound = Sound(
        name='XMas Night',
        ratingCount=5,
        likesCount=10,
        dislikesCount=0,
        playsCount=25,
        averageRating=2,
        collection=collection,
        type=sound_type,
        length=235,
        artwork_type='SNG',
    )
    sound.save()


def notifications_creator():

    notification = Notification(
        name='Not 01',
        initial_date='2016-10-10',
        closing_date='2016-11-11',
        description='Not 01 Desc',
        notification_type = 'PB',
    )
    notification.save()

    requested_piece = RequestedPiece(
        name='Piece 01',
        features='Features 01',
        notification=notification,
    )
    requested_piece.save()

    requested_piece = RequestedPiece(
        name='Piece 02',
        features='Features 02',
        notification=notification,
    )
    requested_piece.save()

    requested_piece = RequestedPiece(
        name='Piece 03',
        features='Features 03',
        notification=notification,
    )
    requested_piece.save()

    notification = Notification(
        name='Not 02',
        initial_date='2016-12-10',
        closing_date='2017-01-11',
        description='Not 02 Desc',
        notification_type='PR',
    )
    notification.save()

    requested_piece = RequestedPiece(
        name='AWR 04',
        features='Features 04',
        notification=notification,
    )
    requested_piece.save()

    requested_piece = RequestedPiece(
        name='AWR 05',
        features='Features 05',
        notification=notification,
    )
    requested_piece.save()

def agents_creator():
    user = django.contrib.auth.models.User.objects.create_user(username='ca_user_01', password='causer011234')
    business_agent = BusinessAgent(
        user=user,
        profile_picture='media/profilePictures/ironmaiden2015bandwlogo_638.jpg',
        company_name='Producciones JES',
        address='Fake St 123',
        city='Springfield',
        country='USA',
        telephone=123456,
    )
    business_agent.save()

    user = django.contrib.auth.models.User.objects.create_user(username='ca_user_02', password='causer021234')
    business_agent = BusinessAgent(
        user=user,
        profile_picture='media/profilePictures/ironmaiden2015bandwlogo_638.jpg',
        company_name='RTI',
        address='Lambda St 456',
        city='Arcade',
        country='NZ',
        telephone=985555,
    )
    business_agent.save()


def users_tokens():
    for user in User.objects.all():
        Token.objects.get_or_create(user=user)



songs_creator()
sounds_creator()
notifications_creator()
agents_creator()

users_tokens()
