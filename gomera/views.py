from django.shortcuts import render, HttpResponse
from django.views.generic import TemplateView
# Create your views here.
import json,httplib,urllib
from django.utils import simplejson

class indexView(TemplateView):
	template_name  = 'base.html'
	connection = httplib.HTTPConnection('intrinsecus.crypticocorp.com', 80)
	connection.connect()
	connection.request('GET', '/api/namespaces/ads/sources/gomeras/data/', '', {})
	result = json.loads(connection.getresponse().read())
	print result



def practice(request):
    return render(request,"practice.html", {});

def getCoordinates(request):
    if request.GET:
        print request.GET
        connection = httplib.HTTPConnection('intrinsecus.crypticocorp.com', 80)
        connection.connect()
        latitude  = request.GET['latitude']
        longitude = request.GET['longitude']
        print latitude
        print longitude
        connection.request('GET', 'http://intrinsecus.crypticocorp.com/api/namespaces/ads/sources/gomeras/data/?geometry__intersects=Point(['+longitude+','+latitude+']).buffer(0.05)&_format=json', '', {})
        result = json.loads(connection.getresponse().read())
        return HttpResponse(simplejson.dumps(result), content_type='application/json')
    return HttpResponse('')
    