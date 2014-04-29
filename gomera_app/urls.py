from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib import admin
from gomera.views import indexView, getCoordinates

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gomera_app.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', indexView.as_view(), name='index'),
    url(r'^getCoordinates/$', getCoordinates, name='coor'),
)

urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    'document_root': settings.MEDIA_ROOT}))

urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
     {'document_root': settings.STATICFILES_DIRS[0], 'show_indexes': True}),
)
