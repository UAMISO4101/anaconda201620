from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^/create-notification/$', views.create_notification, name='create-notification'),
]
