import django
from django.test import Client
from django.test import TestCase

# Create your tests here.
from comercial_agent.models import Genre, Artist, ArtworkCollection, Album, Song, Notification, RequestedPiece, \
    PostulatedArtwork


class Postulation(TestCase):

    def setUp(self):

        user = django.contrib.auth.models.User.objects.create_user(username='usuario_test',
                                                                   password='test1234')
        artist = Artist(
            user=user,
            profile_picture='',
            artistic_name='Test Artist',
            account_number=88889,
            address='London 123',
            city='London',
            country='UK',
            telephone=784555,
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

        # Album1
        album = Album(
            name='Album Test',
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
            name='Song Test',
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

        notification = Notification(
            name='Notification Test',
            initial_date='2016-10-10',
            closing_date='2016-11-11',
            description='Not 01 Desc',
            notification_type='PB',
        )
        notification.save()

        requested_piece = RequestedPiece(
            name='Piece Test',
            features='Features 01',
            notification=notification,
        )
        requested_piece.save()

        postulation = Postulation(artist=artist, notification=notification,)
        postulation.save()

        postulated_artwork = PostulatedArtwork(artwork=song, requested_piece= requested_piece,postulation=postulation)
        postulated_artwork.save()

    def test_postulation(self):

        c=Client()
        response = c.get('notifications/?notification_id=1/postulations/')
        print(response.json())

