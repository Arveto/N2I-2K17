window.addEventListener('load',function(){

var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: -25.363, lng: 131.044}
  });


  // Display one event onthe map, add event
  window.dispPoints = function (points) {      //display tab of points
    for (let i = 0; i < points.length; i++) {
      let coords = points[i].coord;
      console.log(coords);

      let marker = new google.maps.Marker({
        position: coords,
        map: map
      });
    }
  }
}



var points = [ {
                coord: {lat: -33.875, lng: 151.056}
              },
              {
                coord: {lat: -33.673, lng: 150.447}
              } ];

dispPoints(points);

  // var marker = ({
  //   position: {lat: -25.363, lng: 131.044},
  //   map: map,
  //   title: 'Ouvrir la discussion'
  // });
  //
  // marker.addListener('click', () => {
  //   console.log("OUVERTURE DU CHAT " + this.evenement);
  // });
},false);
