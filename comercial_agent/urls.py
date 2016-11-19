from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^notifications/user/(?P<user_id>\w+)/$', views.notification_json, name='notificationJSON'),
    url(r'^notifications/(?P<notification_id>\w+)/$', views.edit_notification, name='edit_notification'),
    url(r'^sounds/(?P<artwork_type>\w+)/(?P<artwork_filter>\w+)/$', views.get_artworks, name='get_sounds'),
    url(r'^notifications/open-notifications/$', views.get_open_notifications, name='get_open_notifications'),
    url(r'^notifications/(?P<notification_id>\w+)/publish/$', views.edit_notification_state, name='publish_notification'),
    url(r'^artists/(?P<user_id>\w+)/artworks/$',views.get_artworks_by_artist, name='get_artworks_by_artist'),
    url(r'^notifications/postulate-artworks/$',views.postulate_artwork, name='postulate_artwork'),
    url(r'^notifications/(?P<notification_id>\w+)/postulations/$',views.get_postulations_by_notification,name='get_postulations_by_notification'),
    url(r'^auth/create-artist/$',views.create_artist_user,name='create-artist-user'),
    url(r'^auth/upload-artist-photo/$',views.upload_artist_photo,name='upload-artist-photo'),
    url(r'^notifications/(?P<notification_id>/set-winner/(?P<postulation_id>\w+)/$', views.set_notification_winner, name='set_notification_winner'),
    url(r'^obtain-auth-token/', obtain_auth_token),
    url(r'^auth/login/', views.login_view, name="login"),
    url(r'^auth/logout/', views.logout_view, name="logout"),
    url(r'^auth/is-logged/', views.is_logged_view, name="is_logged"),
    url(r'^auth/get-logged-user/', views.get_authenticated_user, name="get_logged_user"),
]
