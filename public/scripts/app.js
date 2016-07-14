console.log("Sanity Check: JS is working!");

$(document).ready(function(){

function createMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.7420, lng: -104.991531},
    zoom: 6
  });
}

createMap();

});
