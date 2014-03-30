from django.conf.urls import patterns, include, url
from .views import indexView
from views import practice, getCoordinates
from django.conf import settings

urlpatterns = patterns('',
   
    url(r'^$',indexView.as_view(),name = 'index'),
   )