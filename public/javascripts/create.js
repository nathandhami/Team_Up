// $(() => {
//   var marker;
//   function loadMap() {
//     var sfu = {lat: 49.277654, lng: -122.919974};
//     var mapOptions = {
//       center: sfu,
//       zoom: 12,
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       scaleControl: true,
//     };
//     var map = new google.maps.Map(document.getElementById('map'),
//     mapOptions);
//     marker = new google.maps.Marker({
//       position: sfu,
//       map: map,
//       animation: google.maps.Animation.DROP,
//     });
//     marker.setAnimation(null);
//     marker.addListener('click', toggleBounce);
//   }
//   function toggleBounce() {
//     if (marker.getAnimation() !== null) {
//       marker.setAnimation(null);
//     } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
//   }
//   google.maps.event.addDomListener(window, 'load', loadMap);
// });
