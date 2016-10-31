from django.test import TestCase

# Create your tests here.
from comercial_agent.models import Genre


class GenreTestCase(TestCase):

    def setUp(self):

        Genre.objects.create(name="Alternative Rock")
        Genre.objects.create(name="Punk")

    def test_upper_name(self):

        genre1 = Genre.objects.get(id=1)
        genre2 = Genre.objects.get(id=2)
        self.assertEqual(genre1.upperName(), 'ALTERNATIVE ROCK')
        self.assertEqual(genre2.upperName(), 'PUNK')
