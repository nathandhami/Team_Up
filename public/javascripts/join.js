$(document).ready(() => {

  $('.joinEventBtn').click( (e) => {
    let event_alias_id = $(e.target).children('input').val();
    console.log(event_alias_id);
    let csrf = $('#input_csrf').val();
        $.ajax({
          type: 'POST',
          url: '/join',
          data: {
              "_csrf": csrf,
              "eventAliasId": event_alias_id,
            },
          timeout: 3000,
          success: function(response) {
            if (response.status == '400') {
              swal({
                  title: response.msg,
                  text: response.text,
                  type: 'warning',
                  confirmButtonColor: '#DD6B55',
                  confirmButtonText: 'Okay',
                  closeOnConfirm: true,
              });
            } 
            else {
              swal({
                  title: response.msg,
                  text: response.text,
                  type: 'success',
                  confirmButtonColor: "#DD6B55",
                  confirmButtonText: 'Okay',
                  closeOnConfirm: false,
              },
              () => {
                window.location.href = response.redirect;
              });
            }
            
            },
            error: function(response) {
              console.log(response);
            },
        });
  });

  $('#showAllEventsBtn').click( (e) => {
      $('.ac-event-panel').removeClass("highlight");
      $('.ac-event-panel').show();
      $('html,body').animate({
        scrollTop: $("#showAllEventsBtn").offset().top},
        'slow');
  });

});

// Uses Google maps callback api, no need to wait for DOM to load
let markers = [];
let map, infoWindow, service, currentUserLocation;

function loadMap() {

  let locations = $('#input_events').val();
  locations = JSON.parse(locations);
  // Create the map with a default center.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 10,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

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

  // Create the search box and link it to the UI element.
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  let newMarker;
  for (let i = 0; i < locations.length; i++) {
    let locationName = locations[i].locationName;
    let locationAddress = locations[i].locationAddress;
    let lat = locations[i].locationCoordinates[1];
    let long = locations[i].locationCoordinates[0];
    let category = locations[i].sport;
    let teamupName = locations[i].teamupName;
    let from_date = locations[i].from.split('T')[0] + ' ' + locations[i].from.split('T')[1].split('.')[0];;
    let to_date = locations[i].to.split('T')[0] + ' ' + locations[i].to.split('T')[1].split('.')[0];;;
    let content = "<b>TeamUp Name</b>: " + teamupName + "<br>" + 
                  "<b>From</b>: " + from_date + "<br>" + 
                  "<b>To</b>: " + to_date + "<br>" + 
                  "<b>Sport</b>: " + category + "<br>" + 
                  "<b>Location</b>: " + locationName + "<br>" + locationAddress + 
                  "<br><a class='directions' target='_blank' href=https://www.google.com/maps/dir//" + lat + "," + long + ">Get Directions</a>";
    newMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: map,
      title: locationName
    });
    newMarker.category = category;
    newMarker.setVisible(true);
    (function (newMarker, locationName, locationAddress, content, infoWindow, index) {
      google.maps.event.addListener(newMarker, 'click', function () {
        infoWindow.setContent(content);
        infoWindow.open(map, newMarker);
        let locationNameElement = $("#locationName");
        let locationAddrElement = $("#locationAddress");
        locationNameElement.val(locationName);
        locationAddrElement.val(locationAddress);

        let eventLocation = [];
        eventLocation[0] = newMarker.getPosition().lng();
        eventLocation[1] = newMarker.getPosition().lat(); 
        let jsonGeo = JSON.stringify(eventLocation);
        $('#map-input').attr('value', jsonGeo);

        $('.ac-event-panel').removeClass("highlight");
        $('.ac-event-panel').hide();
        $('#mixin' + index).show();
        $('#mixin' + index).addClass("highlight");
      });
    })
    (newMarker, locationName, locationAddress, content, infoWindow, i);
    markers.push(newMarker);
  }

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
    });
    map.fitBounds(bounds);
  });
}

//  Display the markers dynamically depending on request type
function displayMarkersGeo(category) {
  let request = {
    // map.getCenter()
    // location is retrieved from geolocation
    location: currentLocation,
    radius: 8047,
    types: ['park'],
  }

  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK){
      for (let i =0; i < results.length; i++){
        let location = results[i].geometry.location;
        let marker = new google.maps.Marker({
          map:map,
          position: results[i].geometry.location
        });
      }

    }
  });

}

// Handle the error for user's location
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
