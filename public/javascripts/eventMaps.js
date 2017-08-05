// Uses Google maps callback api, no need to wait for DOM to load
let map, infoWindow, eventLocation;

$(document).ready(() => {
  let bullseyeNode = $('.panelA').find('a');
  bullseyeNode.on('click', (e) => {
    e.preventDefault();
    if (eventLocation != null) {
      map.setCenter(eventLocation);
     }
  });
});

function loadMap() {
  // Create the map with a default center.
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 49.278628, lng: -122.920355 },
    zoom: 12,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();

  let eventMarker;
  let longitude = localEventData.loc[0];
  let latitude = localEventData.loc[1];
  let content = localEventData.locationName + "<br>" + localEventData.locationAddr  +
    "<br><a class='directions' target='_blank' href=https://www.google.com/maps/dir//"
    + latitude + "," + longitude + ">Get Directions</a>";
  eventMarker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
  });

  map.setCenter(eventMarker.getPosition());
  eventLocation = eventMarker.getPosition();
  infoWindow.setContent(content);
  infoWindow.open(map, eventMarker);

  google.maps.event.addListener(eventMarker, 'click', function () {
    infoWindow.setContent(content);
    infoWindow.open(map, eventMarker);
  });
}
