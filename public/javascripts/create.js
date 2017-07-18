var markers = [];

function loadMap() {
  var locations = [
    ['Terry Fox Field', 49.278657, -122.922332, 1],
    ['Field 2', 49.279374, -122.927718, 1],
    ['Forest Grove Park', 49.265672, -122.921870, 1],
    ['SFU Fitness Centre', 49.2794424, -122.9245066, 2],
    ['Forest Grove Park', 49.265949, -122.923910, 2]
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 12,
    mapTypeId: 'roadmap'
  });

  var infoWindow = new google.maps.InfoWindow();

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Create a marker with its category for each location
  var i, newMarker;
  for (i = 0; i < locations.length; i++) {
    newMarker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      title: locations[i][0]
    });
    newMarker.category = locations[i][3];
    newMarker.setVisible(false);
    markers.push(newMarker);
  }

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length == 0) {
      return;
    }

    // For each place, get the location.
    var bounds = new google.maps.LatLngBounds();
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
    });
    map.fitBounds(bounds);
  });
}

function displayMarkers(category) {
  var i;
  for (i = 0; i < markers.length; i++) {
    if (markers[i].category === category) {
      markers[i].setVisible(true);
    }
    else {
      markers[i].setVisible(false);
    }
  }
}
