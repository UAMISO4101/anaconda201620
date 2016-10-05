from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class AbsUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(
        null=False,
        upload_to='profilePictures',
        max_length=1000,
    )

    class Meta:
        abstract = True


class Artist(AbsUser):
    artistic_name = models.CharField(
        max_length=255,
    )
    account_number = models.IntegerField()
    address = models.CharField(
        max_length=150,
    )
    city = models.CharField(
        max_length=30,
    )
    country = models.CharField(
        max_length=30,
    )
    telephone = models.IntegerField()

    def __str__(self):
        return ''.join([
            self.artistic_name,
        ])


class BusinessAgent(AbsUser):
    company_name = models.CharField(
        max_length=255,
    )
    address = models.CharField(
        max_length=150,
    )
    city = models.CharField(
        max_length=30,
    )
    country = models.CharField(
        max_length=30,
    )
    telephone = models.IntegerField()


class Manager(AbsUser):
    telephone = models.IntegerField()


class Notification(models.Model):
    PRIVATE = 'PR'
    PUBLIC = 'PB'
    NOTIFICATION_TYPE = (
        (PRIVATE, 'Privada'),
        (PUBLIC, 'Publica')
    )

    name = models.CharField(
        max_length=255,
    )
    initial_date = models.DateField()
    closing_date = models.DateField()
    description = models.CharField(
        max_length=510,
    )
    notification_type = models.CharField(
        max_length=2,
        choices=NOTIFICATION_TYPE,
        default=PUBLIC,
    )

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "initial_date": str(self.initial_date),
            "closing_date": str(self.closing_date),
            "description": self.description,
            "notification_type": self.notification_type
        }


class ArtworkRequest(models.Model):
    name = models.CharField(
        max_length=255,
    )
    features = models.CharField(
        max_length=1020,
    )
    notification = models.ForeignKey(Notification, null=False)


class ArtworkCollection(models.Model):
    artist = models.OneToOneField(Artist, null=False)

    def __str__(self):
        return ''.join([
            self.artist.artistic_name,
            ' Collection',
        ])


class Artwork(models.Model):
    name = models.CharField(
        max_length=255,
    )
    ratingCount = models.IntegerField()
    likesCount = models.IntegerField()
    dislikesCount = models.IntegerField()
    playsCount = models.IntegerField()
    averageRating = models.IntegerField()
    collection = models.ForeignKey(ArtworkCollection, null=False)

    def __str__(self):
        return ''.join([
            self.name + ' - ',
            self.collection.artist.artistic_name,
        ])


class Tag(models.Model):
    name = models.CharField(
        max_length=255,
    )
    artwork = models.ForeignKey(Artwork, null=False)


class SoundType(models.Model):
    name = models.CharField(
        max_length=50,
    )

    def __str__(self):
        return ''.join([
            self.name,
        ])


class Genre(models.Model):
    name = models.CharField(
        max_length=100,
    )

    def __str__(self):
        return ''.join([
            self.name,
        ])


class Sound(Artwork):
    type = models.ForeignKey(SoundType, null=False)



