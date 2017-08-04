// Uses Google maps callback api, no need to wait for DOM to load
let markers = [];
let map, infoWindow, service, currentLocation;

function loadMap() {
  // Create the map with a default center.
  currentLocation = {lat: 49.278628, lng: -122.920355};
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLocation,
    zoom: 12,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    let places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }
    // For each place, get the location.
    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      // Find parks around the location
      service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: place.geometry.location,
        radius: 1500,
        types: ['park']
      }, callback);
    });
    map.fitBounds(bounds);
  });

  // Locate user's location if location is turned on
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      currentLocation = pos;
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// For each location, create a marker
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

// Create marker with details
function createMarker(place) {
  let location = place.geometry.location;
  let marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    title: place.name
  });
  let request = { reference: place.reference };
  service.getDetails(request, function(details, status) {
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent('<div><strong>' + details.name + '</strong><br>' +
        // details.geometry.location + '<br>' +
        details.formatted_address + '</div>'
        // details.website + '<br />' +
        // details.rating + '<br />' +
        // details.formatted_phone_number
      );
      if (details.formatted_address == "") {
        marker.setVisible(false);
      }
      infoWindow.open(map, this);
      $("#locationName").val(place.name);
      $("#locationAddress").val(details.formatted_address);
      let eventLocation = [];
      eventLocation[0] = marker.getPosition().lng();
      eventLocation[1] = marker.getPosition().lat();
      let jsonGeo = JSON.stringify(eventLocation);
      $('#map-input').attr('value', jsonGeo);
    });
  })
}

// Handle the error for user's location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
