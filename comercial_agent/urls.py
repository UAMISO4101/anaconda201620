from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^notifications/$', views.notification_json, name='notificationJSON'),
    url(r'^notifications/(?P<notification_id>\w+)/$', views.edit_notification, name='edit_notification'),
    url(r'^sounds/(?P<artwork_type>\w+)/(?P<artwork_filter>\w+)/$', views.get_artworks, name='get_sounds'),
    url(r'^notifications/open-notifications/$', views.get_open_notifications, name='get_open_notifications'),
    url(r'^notifications/(?P<notification_id>\w+)/publish/$', views.edit_notification_state, name='publish_notification'),
    url(r'^artists/(?P<user_id>\w+)/artworks/$',views.get_artworks_by_artist, name='get_artworks_by_artist'),
    url(r'^notifications/postulate-artworks/$',views.postulate_artwork, name='postulate_artwork'),
]
