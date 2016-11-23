#from django.contrib.auth.models import User
# python manage.py shell << seed.py
import os

import django
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from comercial_agent.models import Artist, ArtworkCollection, SoundType, Genre, Album, Song, Sound, Notification, \
    RequestedPiece, BusinessAgent

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sonidos_libres.settings")


def create_artist_user_05():
    user = django.contrib.auth.models.User.objects.create_user(username='ironmaiden_user',
                                                               password='ironmaiden1234',
                                                               first_name='Iron',
                                                               last_name='Maiden',
                                                               email='ironmaiden@sonidoslibres.com')

    artist = Artist(
        user=user,
        profile_picture='profilePictures/ironmaiden2015bandwlogo_638.jpg',
        artistic_name='Iron Maiden',
        account_number=88889,
        address='London 123',
        city='London',
        country='UK',
        telephone=784555,
    )
    artist.save()


def create_artist_user_02():
    user = django.contrib.auth.models.User.objects.create_user(username='coke_user',
                                                               password='cokeuser1234',
                                                               first_name='Coca',
                                                               last_name='Cola',
                                                               email='cocacola@sonidoslibres.com')

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


def create_artist_user_03():
    user = django.contrib.auth.models.User.objects.create_user(username='heclav_user',
                                                               password='heclavuser1234',
                                                               first_name='Hector',
                                                               last_name='Lavoe',
                                                               email='hectorlavoe@sonidoslibres.com')

    artist = Artist(
        user=user,
        profile_picture='profilePictures/Hector_-La_Voz-_Lavoe.jpg',
        artistic_name='Hector Lavoe',
        account_number=55325,
        address='7th Ave',
        city='New York',
        country='USA',
        telephone=1111521,
    )
    artist.save()


def create_artist_user_04():
    user = django.contrib.auth.models.User.objects.create_user(username='paslop_user',
                                                               password='paslopuser1234',
                                                               first_name='Pastor',
                                                               last_name='Lopez',
                                                                   email='pastorlopez@sonidoslibres.com')

    artist = Artist(
        user=user,
        profile_picture='profilePictures/pastor-lopez.jpg',
        artistic_name='Pastor Lopez',
        account_number=88888,
        address='Calle 65',
        city='Barquisimeto',
        country='Venezuela',
        telephone=1556699,
    )
    artist.save()


def create_artist_user_01():
    user = django.contrib.auth.models.User.objects.create_user(username='rodaica_user',
                                                               password='rodaicauser1234',
                                                               first_name='Rodolfo',
                                                               last_name='Aicardi',
                                                                   email='rodolfoaicardi@sonidoslibres.com')

    artist = Artist(
        user=user,
        profile_picture='profilePictures/rodolfoaicardi.jpg',
        artistic_name='Rodolfo Aicardi',
        account_number=88888,
        address='Calle 33',
        city='Magangue',
        country='Colombia',
        telephone=1556699,
    )
    artist.save()


def create_content_artist_05():

    artist = Artist.objects.get(artistic_name='Iron Maiden')

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
        contentUrl='audios/Powerslave Full Album (128kbit_AAC).mp3',
        cover='covers/Iron_Maiden_-_Powerslave.jpg',
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
        contentUrl='audios/Iron+Maiden+-+Aces+High+(128kbit_AAC).mp3',
        cover='covers/Aces_High_Iron_Maiden_single_-_cover_art.jpg',
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
        contentUrl='audios/Iron+Maiden-+Powerslave+(128kbit_AAC).mp3',
        cover='covers/Iron_Maiden_-_Powerslave.jpg',
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
        contentUrl='audios/Iron+Maiden+2+Minutes+To+Midnight+(Studio+Version)+(128kbit_AAC).mp3',
        cover='covers/Iron_maiden_2_minutes_to_midnight_a.jpg',
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
        contentUrl='audios/Iron Maiden - The Number Of The Beast (1982) - Full Album (192kbit_AAC).mp3',
        cover='covers/IronMaiden_NumberOfBeast.jpg',
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
        contentUrl='audios/The+Number+of+the+Beast+LYRICS+(128kbit_AAC).mp3',
        cover='covers/Notb.jpg',
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
        contentUrl='audios/Iron+Maiden+-+Run+To+The+Hills+(128kbit_AAC).mp3',
        cover='covers/Iron_Maiden_-_Run_to_the_Hills.jpg'
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
        contentUrl='audios/Iron+Maiden+-+Hallowed+Be+Thy+Name+(Studio+Version)+(128kbit_AAC).mp3',
        cover='covers/Hallowed_Be_Thy_Name.jpg',
    )
    song.save()


def create_content_artist_02():

    artist = Artist.objects.get(artistic_name='Coca Cola')

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
        contentUrl='audios/Always Coca-Cola Classic TVC (128kbit_AAC).mp3',
        cover = 'covers/coke-3JPG.jpg',
    )
    sound.save()


def create_content_artist_03():

    artist = Artist.objects.get(artistic_name='Hector Lavoe')

    collection = ArtworkCollection(
        artist=artist,
    )
    collection.save()

    genre = Genre(
        name='Salsa',
    )
    genre.save()

    #Album1
    album = Album(
        name='Hector - Grandes Exitos',
        ratingCount=8,
        likesCount=253,
        dislikesCount=8,
        playsCount=155,
        averageRating=5,
        collection=collection,
        genre=genre,
        length=3072,
        contentUrl='audios/SOLO UN CIGARRO - PASTOR LOPEZ (128kbit_AAC).mp3',
        cover='covers/hector_exitos.jpg',
        artwork_type='ALB',
    )
    album.save()

    song = Song(
        name='Periodico de Ayer',
        ratingCount=44,
        likesCount=365,
        dislikesCount=7,
        playsCount=2564,
        averageRating=4,
        collection=collection,
        song_album=album,
        length=271,
        artwork_type='SNG',
        contentUrl='audios/Hector Lavoe - Periodico De Ayer (128kbit_AAC).mp3',
        cover='covers/hector_elperiodico.jpg',
    )
    song.save()

    song = Song(
        name='Aguanile',
        ratingCount=95,
        likesCount=663,
        dislikesCount=10,
        playsCount=8532,
        averageRating=5,
        collection=collection,
        song_album=album,
        length=432,
        artwork_type='SNG',
        contentUrl='audios/Willie Colon & Hector Lavoe - Aguanile (Lyrics_Letras) salsa (192kbit_AAC).mp3',
        cover='covers/hector_aguanile.jpg',
    )
    song.save()

    song = Song(
        name='El Cantante',
        ratingCount=63,
        likesCount=542,
        dislikesCount=9,
        playsCount=4712,
        averageRating=3,
        collection=collection,
        song_album=album,
        length=364,
        artwork_type='SNG',
        contentUrl='audios/Hector Lavoe EL CANTANTE (128kbit_AAC).mp3',
        cover='covers/hector_elcantante.jpg',
    )
    song.save()


def create_content_artist_04():

    artist = Artist.objects.get(artistic_name='Pastor Lopez')

    collection = ArtworkCollection(
        artist=artist,
    )
    collection.save()

    genre = Genre.objects.get(name='Cumbia')

    #Album1
    album = Album(
        name='Pastor Lopez - Grandes Exitos',
        ratingCount=8,
        likesCount=253,
        dislikesCount=8,
        playsCount=155,
        averageRating=5,
        collection=collection,
        genre=genre,
        length=3072,
        contentUrl='audios/HECTOR LAVOE _ Grandes Éxitos Completo (192kbit_AAC).mp3',
        cover='covers/Pastor_Lopez_Y_Su_Combo-20_Grandes_Exitos-Frontal.jpg',
        artwork_type='ALB',
    )
    album.save()

    song = Song(
        name='Traicionera',
        ratingCount=44,
        likesCount=365,
        dislikesCount=7,
        playsCount=2564,
        averageRating=4,
        collection=collection,
        song_album=album,
        length=271,
        artwork_type='SNG',
        contentUrl='audios/Pastor Lopez-Traicionera (128kbit_AAC).mp3',
        cover='covers/Traicionera1.jpg',
    )
    song.save()

    song = Song(
        name='El Ausente',
        ratingCount=95,
        likesCount=663,
        dislikesCount=10,
        playsCount=8532,
        averageRating=5,
        collection=collection,
        song_album=album,
        length=432,
        artwork_type='SNG',
        contentUrl='audios/EL AUSENTE - PASTOR LOPEZ (128kbit_AAC).mp3',
        cover='covers/pastor_elausente.jpg',
    )
    song.save()

    song = Song(
        name='Solo Un Cigarro',
        ratingCount=63,
        likesCount=542,
        dislikesCount=9,
        playsCount=4712,
        averageRating=3,
        collection=collection,
        song_album=album,
        length=364,
        artwork_type='SNG',
        contentUrl='audios/SOLO UN CIGARRO - PASTOR LOPEZ (128kbit_AAC).mp3',
        cover='covers/pastor_cigarro.jpg',
    )
    song.save()


def create_content_artist_01():

    artist = Artist.objects.get(artistic_name='Rodolfo Aicardi')

    collection = ArtworkCollection(
        artist=artist,
    )
    collection.save()

    genre = Genre(
        name='Cumbia',
    )
    genre.save()

    #Album1
    album = Album(
        name='Rodolfo Aicardi - Grandes Exitos',
        ratingCount=8,
        likesCount=253,
        dislikesCount=8,
        playsCount=155,
        averageRating=5,
        collection=collection,
        genre=genre,
        length=3072,
        contentUrl='audios/HECTOR LAVOE _ Grandes Éxitos Completo (192kbit_AAC).mp3',
        cover='covers/rodolfo_exitos.jpg',
        artwork_type='ALB',
    )
    album.save()

    song = Song(
        name='Adonay',
        ratingCount=44,
        likesCount=365,
        dislikesCount=7,
        playsCount=2564,
        averageRating=4,
        collection=collection,
        song_album=album,
        length=271,
        artwork_type='SNG',
        contentUrl='audios/ADONAY - RODOLFO  CON LOS HISPANOS (128kbit_AAC).mp3',
        cover='covers/adonay.jpg',
    )
    song.save()

    song = Song(
        name='Tus Besos Son',
        ratingCount=95,
        likesCount=663,
        dislikesCount=10,
        playsCount=8532,
        averageRating=5,
        collection=collection,
        song_album=album,
        length=432,
        artwork_type='SNG',
        contentUrl='audios/TUS BESOS SON Rodolfo Aicardi (128kbit_AAC).mp3',
        cover='covers/rodolfo_tusbesos.jpg',
    )
    song.save()


def create_agent_01():
    user = django.contrib.auth.models.User.objects.create_user(username='ca_user_01',
                                                               password='causer011234',
                                                               first_name='Agente',
                                                               last_name='Juan',
                                                               email='agentejuan@sonidoslibres.com')
    business_agent = BusinessAgent(
        user=user,
        profile_picture='profilePictures/jes.jpg',
        company_name='Producciones JES',
        address='Fake St 123',
        city='Springfield',
        country='USA',
        telephone=123456,
    )
    business_agent.save()


def create_agent_02():
    user = django.contrib.auth.models.User.objects.create_user(username='ca_user_02',
                                                               password='causer021234',
                                                               first_name='Agente',
                                                               last_name='Pedro',
                                                               email='agentepedro@sonidoslibres.com')
    business_agent = BusinessAgent(
        user=user,
        profile_picture='profilePictures/rti.jpg',
        company_name='RTI',
        address='Lambda St 456',
        city='Arcade',
        country='NZ',
        telephone=985555,
    )
    business_agent.save()


def create_notification_01():

    agent = BusinessAgent.objects.get(company_name='RTI')

    notification = Notification(
        name='Not 01',
        initial_date='2016-10-10',
        closing_date='2016-11-11',
        description='Not 01 Desc',
        notification_type = 'PB',
        business_agent=agent,
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
        business_agent=agent,
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


def users_tokens():
    for user in User.objects.all():
        Token.objects.get_or_create(user=user)



create_artist_user_01()
create_artist_user_02()
create_artist_user_03()
create_artist_user_04()
create_artist_user_05()

create_content_artist_01()
create_content_artist_02()
create_content_artist_03()
create_content_artist_04()
create_content_artist_05()

create_agent_01()
create_agent_02()

create_notification_01()

users_tokens()
