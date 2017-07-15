var marker;
var infowindow;
function loadMap() {
  var sfu = {lat: 49.277654, lng: -122.919974};
  var mapOptions = {
    center: sfu,
    zoom: 12,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    scaleControl: true,
  };
  var map = new google.maps.Map(document.getElementById("map"),mapOptions);
  marker = new google.maps.Marker({
    position: sfu,
    map: map,
    animation: google.maps.Animation.DROP
  });
  marker.setAnimation(null);
  marker.addListener('click', toggleBounce);
  infowindow = new google.maps.InfoWindow({
    content:"SFU"
  });
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
    infowindow.close();
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    infowindow.open(map, marker);
  }
}
google.maps.event.addDomListener(window, 'load', loadMap);
