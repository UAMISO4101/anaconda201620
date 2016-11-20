import json

import django
from django.test import Client
from django.test import TestCase

# Create your tests here.
from rest_framework import status

from comercial_agent.models import Genre, Artist, ArtworkCollection, Album, Song, Notification, RequestedPiece, \
    PostulatedArtwork, Postulation, BusinessAgent, Sound, SoundType


class AppTest(TestCase):

    def setUp(self):
        print('Tests SetUp started')
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

        user2 = django.contrib.auth.models.User.objects.create_user(username='usuario_test_2',
                                                                   password='test1234')
        artist2 = Artist(
            user=user2,
            profile_picture='',
            artistic_name='Test Artist 2',
            account_number=88889,
            address='London 123',
            city='London',
            country='UK',
            telephone=784555,
        )
        artist2.save()

        collection2 = ArtworkCollection(
            artist=artist2,
        )
        collection2.save()

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

        sound_type = SoundType(
            name='Jingle'
        )
        sound_type.save()

        sound = Sound(
            name='Sound Test',
            ratingCount=44,
            likesCount=365,
            dislikesCount=7,
            playsCount=2564,
            averageRating=4,
            collection=collection2,
            length=271,
            artwork_type='SND',
            cover='http://url',
            contentUrl='http://url',
            type=sound_type,
        )
        sound.save()

        user3 = django.contrib.auth.models.User.objects.create_user(username='ca_user_01', password='causer011234')
        business_agent = BusinessAgent(
            user=user3,
            profile_picture='profilePictures/ironmaiden2015bandwlogo_638.jpg',
            company_name='Producciones JES',
            address='Fake St 123',
            city='Springfield',
            country='USA',
            telephone=123456,
        )
        business_agent.save()

        notification = Notification(
            name='Notification Test',
            initial_date='2016-10-10',
            closing_date='2016-11-11',
            description='Not 01 Desc',
            notification_type='PB',
            business_agent=business_agent,
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
            is_winner=False,
            is_tied=False,
            polls_num=0,
        )
        postulation.save()

        postulated_artwork = PostulatedArtwork(
            artwork=song,
            requestedPiece= requested_piece,
            postulation=postulation,
        )
        postulated_artwork.save()

        postulation2 = Postulation(
            notification=notification,
            artist=artist2,
            is_winner=False,
            is_tied=False,
            polls_num=0,
        )
        postulation2.save()

        postulated_artwork_2 = PostulatedArtwork(
            artwork=sound,
            requestedPiece=requested_piece,
            postulation=postulation,
        )
        postulated_artwork_2.save()

        print('Tests SetUp finished')



    def test_app(self):
        c = Client()

        #Test Postulations
        response = c.get('/comercial_agent/notifications/1/postulations/')

        self.assertEqual(len(response.json()["proposals"]), 2)
        self.assertGreaterEqual(len(response.json()["proposals"][0]["audios"][0]["url"]), 1)

        #Test Artworks
        response = c.get('/comercial_agent/sounds/song/all/')

        self.assertGreaterEqual(len(response.json()["sounds"][0]["url"]), 1)
        self.assertGreaterEqual(len(response.json()["sounds"][0]["soundtrack"]), 1)

        #Test Winners
        response = c.put('/comercial_agent/notifications/1/set-winner/1/')

        self.assertTrue(status.is_success(response.status_code))

        #Test Winners 2
        response2 = c.put('/comercial_agent/notifications/1/set-winner/2/')

        self.assertTrue(status.is_client_error(response2.status_code))

        #Test Likes
        response = c.get('/comercial_agent/notifications/1/postulations/')

        self.assertIsInstance(response.json()["proposals"][0]["likes"], int)

        #Test Ties
        response = c.get('/comercial_agent/notifications/1/postulations/')

        self.assertIsInstance(response.json()["proposals"][0]["tie"], bool)

        #Test Winner
        response = c.get('/comercial_agent/notifications/1/postulations/')

        self.assertIsInstance(response.json()["proposals"][0]["winner"], bool)
