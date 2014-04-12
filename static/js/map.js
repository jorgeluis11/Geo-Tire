var map;
var latitude;
var longitude;
var directionsDisplay;
var json;


function initialize() {
  var mapOptions = {
    zoom: 6
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


function initialize() {
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(-33.868011, 151207566),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    
    

  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    directionsDisplay = new google.maps.DirectionsRenderer();



  // Try HTML5 geolocation
  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      var marker = new google.maps.Marker({
        map: map,
        position: pos,
        animation: google.maps.Animation.BOUNCE,
      });

      var sunCircle = {
        strokeColor: "#004070",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#428bca",
        fillOpacity: 0.35,
        map: map,
        center: pos,
        radius: 5200
      };
      cityCircle = new google.maps.Circle(sunCircle)

      var infowindow = new google.maps.InfoWindow({
        content: 'You are here.'
      });
       map.setCenter(pos);
    google.maps.event.addListener(marker, 'mouseover', function() {
      infowindow.open(map,marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function() {
      infowindow.close();
    });

    map.setCenter(pos);

    var arr =[]

    var directionsRenderer = new google.maps.DirectionsRenderer();

    // var directionsRenderer = new google.maps.DirectionsRenderer();
    // directionsRenderer.setMap(map);    
    // directionsRenderer.setPanel(document.getElementById('directionsPanel'));
     
    var directionsService = new google.maps.DirectionsService();

    

  $.get("/getCoordinates/?latitude="+latitude+"&longitude="+longitude,
    function(data)
    {
      json = data;
      var marker,i, htmlBody;

      var infowindow = new google.maps.InfoWindow();
      var image = '/static/' + "img/gomas.png";
      for (i = 0; i < data.length; i++) 
      {
        var pos = new google.maps.LatLng(data[i].geometry.coordinates[1],
                                               data[i].geometry.coordinates[0]);

        marker = new google.maps.Marker({
          map: map,
          position: pos,
          animation: google.maps.Animation.DROP,
          icon: image
        });


        google.maps.event.addListener(marker, 'click', (function(marker,i) {
        return function(){
          var request = {
            origin: new google.maps.LatLng(latitude,longitude), 
            destination:new google.maps.LatLng(marker.position.k,marker.position.A),
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unitSystem: google.maps.DirectionsUnitSystem.METRIC
            };
          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(response);
              directionsRenderer.setMap(map);
              infowindow.close(map, marker);
            } else {
              alert('Error: ' + status);
            }
          });          
        }}(marker,i)));

        google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          htmlBody = "<table class='table table-striped table-responsive' style='color: black;'>"
          + "<tr><th>Name</th><td>"+ data[i].properties.name +"</td><tr>"
          + "<th>Administrator</th><td>"+ data[i].properties.administrator +"</td></tr>"
          + "<tr><th>Telephone</th><td>"+ data[i].properties.phone +"</td></tr>"
          + "<tr><th>Address</th><td>"+ data[i].properties.address + ", " + data[i].properties.city +"</td></tr></table>";
          infowindow.setContent(htmlBody);
          infowindow.open(map, marker);
          }
        })(marker, i));

         google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
        return function() {
          infowindow.close(map, marker);
          }
        })(marker, i));
      }
     
     // renderMustache(json)
    }), function() {
      handleNoGeolocation(true);
    }
  })} else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {

  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(latitude, longitude),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);