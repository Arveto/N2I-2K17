window.addEventListener('load',function(){

socket.emit("map");

var map;
var currentPoint;

(function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: {lat: 47.276358, lng: 2.436975}
  });


  // Display one event onthe map, add event
  window.dispPoints = function (point) {      //display tab of points
    for (let i = 0; i < point.length; i++) {
      let coords = point[i].coord;
      console.log(coords);

      let marker = new google.maps.Marker({
        position: coords,
        map: map
      });

      marker.addListener('click', function() {
        map.setZoom(15);
        map.setCenter(marker.getPosition());

        // socket.emit("joinEvent", point[i].eventId);
        console.log("emit eventId " + point[i].eventId);
      });
    }
  }

  google.maps.event.addListener(map, 'click', function(event) {
    currentPoint = event.latLng;
    placeMarker(event.latLng);
});

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
})();



var points = [ {
                coord: {lat: -33.875, lng: 151.056},
                eventId: 42
              },
              {
                coord: {lat: -33.673, lng: 150.447},
                eventId: 666
              } ];

dispPoints(points);

},false);
