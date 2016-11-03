import django
from django.test import Client
from django.test import TestCase

# Create your tests here.
from comercial_agent.models import Genre, Artist, ArtworkCollection, Album, Song, Notification, RequestedPiece, \
    PostulatedArtwork, Postulation


class PostulationTest(TestCase):

    def setUp(self):

        user = django.contrib.auth.models.User.objects.create_user(username='usuario_test',
                                                                   password='test1234')
        artist1 = Artist(
            user=user,
            profile_picture='',
            artistic_name='Test Artist',
            account_number=88889,
            address='London 123',
            city='London',
            country='UK',
            telephone=784555,
        )
        artist1.save()

        collection = ArtworkCollection(
            artist=artist1,
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
            cover='http://url',
            contentUrl='http://url'
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

        postulation = Postulation(
            notification=notification,
            artist=artist1,
        )
        postulation.save()

        postulated_artwork = PostulatedArtwork(
            artwork=song,
            requestedPiece= requested_piece,
            postulation=postulation,
        )
        postulated_artwork.save()

    def test_postulation(self):
        c = Client()
        response = c.get('/comercial_agent/notifications/1/postulations/')

        self.assertEqual(len(response.json()["proposals"]), 1)
        self.assertGreaterEqual(len(response.json()["proposals"][0]["audios"][0]["url"]), 1)

        c2 = Client()
        response2 = c2.get('/comercial_agent/sounds/song/all/')
        self.assertGreaterEqual(len(response2.json()["sounds"][0]["url"]), 1)
        self.assertGreaterEqual(len(response2.json()["sounds"][0]["soundtrack"]), 1)

