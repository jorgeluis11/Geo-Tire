from django.shortcuts import render, HttpResponse
from django.views.generic import TemplateView
# Create your views here.
import json,httplib,urllib
from django.utils import simplejson

class indexView(TemplateView):
	template_name  = 'index.html'

def getCoordinates(request):
    if request.GET:
        connection = httplib.HTTPConnection('intrinsecus.crypticocorp.com', 80)
        connection.connect()
        latitude  = request.GET['latitude']
        longitude = request.GET['longitude']
        connection.request('GET', 'http://intrinsecus.crypticocorp.com/api/namespaces/ads/sources/gomeras/data/?geometry__intersects=Point(['+longitude+','+latitude+']).buffer(0.05)&_format=json', '', {})
        result = json.loads(connection.getresponse().read())
        return HttpResponse(simplejson.dumps(result), content_type='application/json')
    return HttpResponse('')
    