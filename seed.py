#from django.contrib.auth.models import User
# python manage.py shell << seed.py
import os

import django

from comercial_agent.models import Artist, ArtworkCollection, SoundType, Genre, Album, Song, Sound


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sonidos_libres.settings")


def songs_creator():

    user = django.contrib.auth.models.User.objects.create_user(username='ironmaiden_user', password='ironmaiden1234')
    artist = Artist(
        user = user,
        profile_picture='profilePictures/ironmaiden2015bandwlogo_638.jpg',
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
    )
    song.save()



def sounds_creator():

    user = django.contrib.auth.models.User.objects.create_user(username='coke_user', password='coke1234')
    artist = Artist(
        user=user,
        profile_picture='profilePictures/coca-cola-02.jpg',
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
    )
    sound.save()


songs_creator()
sounds_creator()
