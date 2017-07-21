var markers = [];

function loadMap() {
  var locations = [
    // soccer
    ['Terry Fox Field', 'Burnaby, BC V5A 1S6', 49.278657, -122.922332, 1],
    ['Field 2', 'Burnaby, BC V5A 1S6', 49.278478, -122.924905, 1],
    ['Residence Field', 'Burnaby, BC, Canada', 49.279378, -122.927717, 1],
    ['Forest Grove Park', 'Burnaby, BC, Canada', 49.265672, -122.921870, 1],
    ['Empire Fields', 'E Hastings St, Vancouver, BC', 49.2823652, -123.034886, 1],
    ['Jericho West Field', '1515 Discovery St, Vancouver, BC V6R 4K5', 49.2728625, -123.2029626, 1],
    ['Carnarvon Park', '2995 W 19th Ave, Vancouver, BC V6L 3C3', 49.2564811, -123.1734225, 1],
    ['Prince of Wales Park', '4780 Haggart St, Vancouver, BC V6L 2H7', 49.2440376, -123.1590958, 1],
    ['Quilchena Park', '4590 Magnolia St, Vancouver, BC V6J 4B5', 49.2437806, -123.1516046, 1],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1672523, 1],
    ['Andy Livingstone Park', '89 Expo Blvd, Vancouver, BC V6B 6N5', 49.2788226, -123.1079865, 1],
    ['David Lam Park', '1300 Pacific Blvd, Vancouver, BC V6Z 0A9', 49.2721506, -123.1271803, 1],
    ['Chaldecott Park', '4175 Wallace St, Vancouver, BC V6S 2J3', 49.2489526, -123.1933026, 1],
    ['Memorial West Park', '4701 Dunbar St, Vancouver, BC V6S 2G8', 49.2433206, -123.1904335, 1],
    ['Musqueam Park', '4000 SW Marine Dr, Vancouver, BC V6N 2B8', 49.2301998, -123.1962955, 1],
    ['Charleson Park', '999 Charleson Street, Vancouver, BC V5Z 4A2', 49.2666129, -123.1281372, 1],
    ['Garden Park', '1851 Garden Dr, Vancouver, BC V5N 4W6', 49.2681669, -123.0612162, 1],
    ['McSpadden Park', '2125 Victoria Dr, Vancouver, BC V5N 5Y4', 49.2661038, -123.068721, 1],
    ['Templeton Park', '700 Templeton Dr, Vancouver, BC V5L 4N8', 49.278319, -123.0613521, 1],
    ['Woodland Park', '705 Woodland Dr, Vancouver, BC V5L 3R2', 49.2785105, -123.0756486, 1],
    ['Adanac Park', '1025 Boundary Rd, Vancouver, BC V5K 4T2', 49.276231, -123.0276928, 1],
    ['Clinton Park', '2690 Grant St, Vancouver, BC V5K 3G9', 49.2705402, -123.0532006, 1],
    ['New Brighton Park', '93 New Brighton Rd, Vancouver, BC V5K', 49.2894798, -123.0372333, 1],
    ['Rupert Park', '3402 Charles St, Vancouver, BC V5K 5H9', 49.2716035, -123.0321886, 1],
    ['Sunrise Park', '1950 Windermere St, Vancouver, BC V5M 3R2', 49.2666929, -123.0373739, 1],
    ['Brewers Park', '4175 Victoria Dr, Vancouver, BC V5N 4M9', 49.2476715, -123.0685292, 1],
    ['Clark Park', '1500 E 14th Ave, Vancouver, BC V5N 3R3', 49.2577806, -123.0758836, 1],
    ['John Hendry (Trout Lake) Park', '3300 Victoria Dr, Vancouver, BC V5N 4M4', 49.2561531, -123.0635412, 1],
    ['Jones Park', '5350 Commercial St, Vancouver, BC V5P 3N3', 49.2360017, -123.0693179, 1],
    ['Kensington Park', '5175 Dumfries St, Vancouver, BC V5P 3A2', 49.2360319,-123.084639, 1],

    // basketball
    ['SFU Fitness Centre', '8888 Gaglardi Way, Burnaby, BC V5A 1S6', 49.2794424, -122.9245066, 2],
    ['Forest Grove Park', 'Burnaby, BC, Canada', 49.265949, -122.923910, 2],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1672523, 2],
    ['Plateau Park Basketball Courts', '3200 E Hastings St, Vancouver, BC V5K 5J3', 49.2823652, -123.034886, 2],

    // volleyball
    ['SFU Fitness Centre', '8888 Gaglardi Way, Burnaby, BC V5A 1S6', 49.2794424, -122.9245066, 3],
    ['English Bay Beach', 'M, Vancouver, BC V6C 3C1', 49.2863149, -123.1456752, 3],
    ['Plateau Park', '3200 E Hastings St, Vancouver, BC V5K 5J3', 49.2823652, -123.034886, 3],
    ['Jericho Beach', 'Vancouver, BC V6R 1B5', 49.2722648, -123.195064, 3],
    ['Kitsilano Beach', 'Vancouver, BC', 49.2749388, -123.1578465, 3],
    ['Locarno Beach', 'Vancouver, BC', 49.2757684, -123.2091231, 3],
    ['Park Site on Shaughnessy Street', 'Vancouver, BC', 49.2021312, -123.1255258, 3],
    ['Spanish Banks East', '4707 NW Marine Dr, Vancouver, BC V6T 1A1', 49.2762188, -123.2170773, 3],
    ['Spanish Banks West', '4875 NW Marine Dr, Vancouver, BC V6T 1A1', 49.2774214, -123.2249616, 3],
    ['Sunset Beach', '1204 Beach Ave, Vancouver, BC V6E 1V3', 49.2799515, -123.1408828, 3],

    // baseball
    ['Field', 'Burnaby, BC, Canada', 49.279000, -122.926365, 4],
    ['Carnarvon Park', '2995 W 19th Ave, Vancouver, BC V6L 3C3', 49.2564811, -123.1734225, 4],
    ['Quilchena Park', '4590 Magnolia St, Vancouver, BC V6J 4B5', 49.2437806, -123.1516046, 4],
    ['Trafalgar Park', '2610 W 23rd Ave, Vancouver, BC V6L 1N7', 49.251888, -123.1672523, 4],
    ['Andy Livingstone Park', '89 Expo Blvd, Vancouver, BC V6B 6N5', 49.2788226, -123.1079865, 4],
    ['Chaldecott Park', '4175 Wallace St, Vancouver, BC V6S 2J3', 49.2489526, -123.1933026, 4],
    ['Memorial West Park', '4701 Dunbar St, Vancouver, BC V6S 2G8', 49.2433206, -123.1904335, 4],
    ['Templeton Park', '700 Templeton Dr, Vancouver, BC V5L 4N8', 49.278319, -123.0613521, 4],
    ['Woodland Park', '705 Woodland Dr, Vancouver, BC V5L 3R2', 49.2785105, -123.0756486, 4],
    ['Clinton Park', '2690 Grant St, Vancouver, BC V5K 3G9', 49.2705402, -123.0532006, 4],
    ['Rupert Park', '3402 Charles St, Vancouver, BC V5K 5H9', 49.2716035, -123.0321886, 4],
    ['Sunrise Park', '1950 Windermere St, Vancouver, BC V5M 3R2', 49.2666929,-123.0373739, 4],
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.278628, lng: -122.920355},
    zoom: 12,
    mapTypeId: 'roadmap'
  });

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
  var infoWindow = new google.maps.InfoWindow();
  for (i = 0; i < locations.length; i++) {
    newMarker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][2], locations[i][3]),
      map: map,
      title: locations[i][0]
    });
    newMarker.category = locations[i][4];
    newMarker.setVisible(false);
    var locationName = locations[i][0];
    var locationAddress = locations[i][1];
    (function (newMarker, locationName) {
      google.maps.event.addListener(newMarker, 'click', function () {
        infoWindow.setContent(locationName);
        infoWindow.open(map, newMarker);
        document.getElementById("locationName").value = locationName;
        document.getElementById("locationName").disabled = true;
        document.getElementById("locationAddress").value = locationAddress;
        document.getElementById("locationAddress").disabled = true;
      });
    })
    (newMarker, locationName);
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
  if (category == 1) {
    document.getElementById("sport").value = "Soccer";
  } else if (category == 2) {
    document.getElementById("sport").value = "Basketball";
  } else if (category == 3) {
    document.getElementById("sport").value = "Volleyball";
  } else if (category == 4) {
    document.getElementById("sport").value = "Baseball";
  }
  document.getElementById("sport").disabled = true;
}
