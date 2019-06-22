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
  	})

  
	 if (navigator.geolocation) {

	    navigator.geolocation.getCurrentPosition(function(position) {
	    	var myLat = position.coords.latitude;
	    	var myLng = position.coords.longitude;
	      	var pos = {
	        	lat: myLat,
	        	lng: myLng
	      	};	

	      	addMarker(pos);
	      	var from = new google.maps.LatLng(pos);

		  	var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://hans-moleman.herokuapp.com/rides', true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
			    if(xhr.readyState == 4 && xhr.status == 200) {
			    	jsonData = xhr.responseText;
			    	outputs = JSON.parse(jsonData);
			    	var cars = {};
			    	var carMark;
			    	var distances = {};
			    	//var to;
			    	var locations = {};
			    	//var shortest;

					for (var i = 0; i < outputs.length; i++) {
						carCount++;
						cars[i] = outputs[i];
						//to = new google.maps.LatLng(cars[i].lat, cars[i].lng)
						locations[i] = new google.maps.LatLng(cars[i].lat, cars[i].lng)
						carMark = new google.maps.Marker ({
							map: map,
							position: locations[i],
							title: cars[i].username,
							icon: carIcon
						})
						distances[i] = google.maps.geometry.spherical.computeDistanceBetween(from, locations[i]);
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

					// should try saving locations in an array in the first place
					//var location = new google.maps.LatLng(cars[index].lat, cars[index].lng);
					//console.log(locations[index]);
					var path = [pos, locations[index]];
					var line = new google.maps.Polyline({
						path: path,
						geodesic: true,
						strokeColor: '#FF0000',
						strokeWeight: 2
					});

					line.setMap(map);	
			    } // end of if ready

			} // end of onreadystatechange

			// still inside get current position function

		    var params = "username=6ST1sfMe&lat=" + myLat + "&lng=" + myLng;
		    xhr.send(params);


	    }, 	function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    }); // end of second get current position function, end of section



	  } // end of if part 
	  else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  } // end of if else (checking for geolocation)


} // end of init map



function addMarker(pos) {
        marker = new google.maps.Marker ({
      		map: map,
      		position: pos,
      		title: "You are here"
      })	
}

/*function addInfoWindow(pos) {
      marker.addListener("click", function() {
      	infoWindow = new google.maps.InfoWindow;
        infoWindow.setPosition(pos);
        infoWindow.setContent('The closest vehicle is.....');
        infoWindow.open(map);
      })
}*/





function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


// don't need this for lab 10
/*
function addCars () {
	var car = 'car.png';

	var location1 = new google.maps.LatLng(42.3453, -71.0464);
	var location2 = new google.maps.LatLng(42.3662, -71.0621);
	var location3 = new google.maps.LatLng(42.3603, -71.0547);
	var location4 = new google.maps.LatLng(42.3472, -71.0802);
	var location5 = new google.maps.LatLng(42.3663, -71.0544);
	var location6 = new google.maps.LatLng(42.3542, -71.0704);


	var car1 = new google.maps.Marker ({
		map: map,
		position: location1,
		title: "mXfkjrFw",
		icon: car
	})
	var car2 = new google.maps.Marker ({
		map: map,
		position: location2,
		title: "nZXB8ZHz",
		icon: car
	})
	var car3 = new google.maps.Marker ({
		map: map,
		position: location3,
		title: "Tkwu74WC",
		icon: car
	})	
	var car4 = new google.maps.Marker ({
		map: map,
		position: location4,
		title: "5KWpnAJN",
		icon: car
	})	
	var car5 = new google.maps.Marker ({
		map: map,
		position: location5,
		title: "uf5ZrXYw",
		icon: car
	})
	var car6 = new google.maps.Marker ({
		map: map,
		position: location6,
		title: "VMerzMH8",
		icon: car
	})				


	car1.setMap(map);
	car2.setMap(map);
	car3.setMap(map);
	car4.setMap(map);
	car5.setMap(map);
	car6.setMap(map);

};
*/
