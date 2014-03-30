from django.conf.urls import patterns, include, url
from gomera.views import practice, getCoordinates
from django.conf import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gomera_app.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$',include("gomera.urls")),
 	url(r'^practice/$', practice, name='home'),
    url(r'^getCoordinates/$', getCoordinates, name='coor'),
)

urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    'document_root': settings.MEDIA_ROOT}))

urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
     {'document_root': settings.STATICFILES_DIRS[0], 'show_indexes': True}),
)
