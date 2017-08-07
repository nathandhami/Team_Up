$(document).ready(() => {
  $('.joinEventBtn').one('click', (e) => {
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
    infoWindow.close();
    $('.ac-event-panel').removeClass("highlight");
    $('.ac-event-panel').show();
    $('html,body').animate({
      scrollTop: $("#showAllEventsBtn").offset().top},
      'slow');
  });
});

// Uses Google maps callback api, no need to wait for DOM to load
let markers = [];
let map, infoWindow, service;

function loadMap() {
  let locations = $('#input_events').val();
  locations = JSON.parse(locations);
  // Create the map with a default center.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 12,
    scaleControl: true,
    mapTypeId: 'roadmap'
  });
  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

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
    });
    map.fitBounds(bounds);
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
    let to_date = 'None Set';
    if (locations[i].to){
      to_date = locations[i].to.split('T')[0] + ' ' + locations[i].to.split('T')[1].split('.')[0];;;
    }
    let content = "<b>TeamUp Name</b>: " + teamupName + "<br>" +
                  "<b>From</b>: " + from_date + "<br>" +
                  "<b>To</b>: " + to_date + "<br>" +
                  "<b>Sport</b>: " + category + "<br>" +
                  "<b>Location</b>: " + locationName + "<br>" + locationAddress +
                  "<br><a class='directions' target='_blank' href=https://www.google.com/maps/dir//" + lat + "," + long + ">Get Directions</a>";

    // check for event on same location
    for (let j = i - 1; j >= 0; j--) {
      if (locations[j].locationCoordinates[1] == lat &&
          locations[j].locationCoordinates[0] == long) {
        //slightly change lat and long
        lat = lat + (Math.random() -1) / 1500;
        long = long + (Math.random() -.5) / 1500;
      }
    }
    newMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, long),
      map: map,
      title: locationName,
      animation: google.maps.Animation.DROP
    });
    newMarker.category = category;
    newMarker.setVisible(true);
    (function (newMarker, locationName, locationAddress, content, infoWindow, index) {
      google.maps.event.addListener(newMarker, 'click', function () {
        infoWindow.setContent(content);
        infoWindow.open(map, newMarker);
        $('.ac-event-panel').removeClass("highlight");
        $('.ac-event-panel').hide();
        $('#mixin' + index).show();
        $('#mixin' + index).addClass("highlight");
      });
    })
    (newMarker, locationName, locationAddress, content, infoWindow, i);
    markers.push(newMarker);
  }

  // Locate user's location if location is turned on
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      currentLocation = pos;
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
    });
  }
}
