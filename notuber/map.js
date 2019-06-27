var map;
var infoWindow;
var marker;
var outputs;
var jsonData;
var carIcon = 'car.png';
var carCount = 0;

function initMap() {

  	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: 42.352271, lng: -71.05524200000001},
    	zoom: 11
    	console.log('x');
  	})
  
	 if (navigator.geolocation) {

	    navigator.geolocation.getCurrentPosition(function(position) {
	    	
	    	var myLat = position.coords.latitude;
	    	var myLng = position.coords.longitude;	
	      	var pos = new google.maps.LatLng(myLat, myLng);
	      	addMarker(pos);

		  	var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://aqueous-inlet-98773.herokuapp.com/rides', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
			    if(xhr.readyState == 4 && xhr.status == 200) {
			    	jsonData = xhr.responseText;
			    	outputs = JSON.parse(jsonData);
			    	
			    	var cars = {};
			    	var carMark;
			    	var distances = {};
			    	var locations = {};
					for (var i = 0; i < outputs.length; i++) {
						carCount++;
						cars[i] = outputs[i];
						locations[i] = new google.maps.LatLng(cars[i].lat, cars[i].lng)
						carMark = new google.maps.Marker ({
							map: map,
							position: locations[i],
							title: cars[i].username,
							icon: carIcon
						})
						distances[i] = google.maps.geometry.spherical.computeDistanceBetween(pos, locations[i]);
					}

					var shortest = distances[0];
					var index = 0;
					for (var j = 0; j < carCount; j++) {
						if (distances[j] < shortest) {
							shortest = distances[j];
							index = j;
						}
					}

					var miles = shortest * 0.000621371;
					var rounded = Math.round(miles * 100) / 100;
					marker.addListener("click", function() {
	      				infoWindow = new google.maps.InfoWindow;
	       				infoWindow.setPosition(pos);
	        			infoWindow.setContent('Closest vehicle: ' + cars[index].username + ' (' + rounded + ' miles away)');
	        			infoWindow.open(map);
	      			})

					var path = [pos, locations[index]];
					var line = new google.maps.Polyline({
						path: path,
						geodesic: true,
						strokeColor: '#FF0000',
						strokeWeight: 2
					});
					line.setMap(map);	
			    }

			}

		    var params = "username=6ST1sfMe&lat=" + myLat + "&lng=" + myLng;
		    xhr.send(params);

	    }, 	function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });

	  }
	  else {
	    // If browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }
}


function addMarker(pos) {
        marker = new google.maps.Marker ({
      		map: map,
      		position: pos,
      		title: "You are here"
      })	
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}
