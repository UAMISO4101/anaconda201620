from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Usuario(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    foto_perfil = models.ImageField(
        null=False,
        upload_to='fotosPerfiles',
        max_length=1000,
    )

    class Meta:
        abstract = True


class Artista(Usuario):
    nombre_artistico = models.CharField(
        max_length=255,
    )
    numero_cuenta = models.IntegerField()
    direccion = models.CharField(
        max_length=150,
    )
    ciudad = models.CharField(
        max_length=30,
    )
    pais = models.CharField(
        max_length=30,
    )
    telefono = models.IntegerField()


class AgenteComercial(Usuario):
    nombre_empresa = models.CharField(
        max_length=255,
    )
    direccion = models.CharField(
        max_length=150,
    )
    ciudad = models.CharField(
        max_length=30,
    )
    pais = models.CharField(
        max_length=30,
    )
    telefono = models.IntegerField()

class Administrador(Usuario):
    telefono = models.IntegerField()

class Convocatoria(models.Model):
    PRIVADA = 'PR'
    PUBLICA = 'PB'
    TIPOS_CONVOCATORIA = (
        (PRIVADA, 'Privada'),
        (PUBLICA, 'Publica')
    )

    nombre = models.CharField(
        max_length=255,
    )
    fecha_inicio = models.DateField()
    fecha_cierre = models.DateField()
    descripcion = models.CharField(
        max_length=510,
    )
    tipo_convocatoria = models.CharField(
        max_length=2,
        choices=TIPOS_CONVOCATORIA,
        default=PUBLICA,
    )


class SolicitudObra(models.Model):
    nombre = models.CharField(
        max_length=255,
    )
    caracteristicas = models.CharField(
        max_length=1020,
    )
    convocatoria = models.ForeignKey(Convocatoria, null=False)