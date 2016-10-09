from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^notifications/$', views.notification_json, name='notificationJSON'),
    url(r'^notifications/$', views.create_notification, name='create_notification'),
    url(r'^notifications/(?P<notification_id>\w+)/$', views.edit_notification, name='edit_notification'),
    url(r'^sounds/$', views.get_artworks, name='get_sounds'),
]
