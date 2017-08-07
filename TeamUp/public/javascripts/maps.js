// Uses Google maps callback api, no need to wait for DOM to load
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
  infoWindow = new google.maps.InfoWindow({ maxWidth: 250 });

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
    findLocations(map.getCenter());
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
      findLocations(place.geometry.location);
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
      var im = 'http://i.stack.imgur.com/orZ4x.png';
      var userMarker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: im
      });
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here.');
      infoWindow.open(map);
      setTimeout(function(){infoWindow.close();}, '3000');
      map.setCenter(pos);
      findLocations(pos);
    });
  }
}

// Find parks around the location
function findLocations(location) {
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: location,
    radius: 5000,
    types: ['park']
  }, callback);
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
  let marker = new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    title: place.name,
    // animation: google.maps.Animation.DROP
  });
  let request = { reference: place.reference };
  service.getDetails(request, function(details, status) {
    if (details == null) {
      marker.setMap(null);
    }
    google.maps.event.addListener(marker, 'click', function() {
      let eventLocation = [];
      eventLocation[0] = marker.getPosition().lng();
      eventLocation[1] = marker.getPosition().lat();
      let jsonGeo = JSON.stringify(eventLocation);
      $('#map-input').attr('value', jsonGeo);
      if (details.website) {
        infoWindow.setContent('<strong>' + place.name + '</strong><br />' + details.formatted_address +
          '<br /><a class="links" target="_blank" href=' + details.website + '>' + details.website +
          '</a><br /><a class="links" target="_blank" href=https://www.google.com/maps/dir//'
          + eventLocation[1] + ',' + eventLocation[0] + '>Get Directions</a>');
      } else {
        infoWindow.setContent('<strong>' + place.name + '</strong><br />' + details.formatted_address +
          '<br /><a class="links" target="_blank" href=https://www.google.com/maps/dir//'
          + eventLocation[1] + ',' + eventLocation[0] + '>Get Directions</a>');
      }
      infoWindow.open(map, this);
      $('#locationName').val(place.name);
      $('#locationAddress').val(details.formatted_address);
      $('html, body').animate({
        scrollTop: $('#soccer').offset().top
      }, 2000);
    });
  })
}
