// Uses Google maps callback api, no need to wait for DOM to load
let markers = [];
let map, infoWindow, currentUserLocation;

function loadMap() {
 
  // Create the map with a default center.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 12,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();


  // Create a marker with its category for each location
  let i;
  let newMarker;
 
}

// For create.js
// Display the markers when the button are clicked
function displayMarkers(category) {
  let i;
  for (i = 0; i < markers.length; i++) {
    if (markers[i].category === category) {
      markers[i].setVisible(true);
    }
    else {
      markers[i].setVisible(false);
    }
  }
}

// Handle the error for user's location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
