var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 12 //14 is best
	});
	addCars();
	locateMe();
}



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


var location;
var infoWindow;
function locateMe() {

	// check if geolocation is enabled
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent("You are here");
			infoWindow.open(map);
			map.setCenter(pos);
		}, function () {
			// browser has geolocation enabled but there's still an error
			handleLocationError(true, infoWindow, map.getCenter());
		});
	}
	else {
		handleLocationError(false, infoWindow, map.getCenter());
	}

	var mark = 'car.png';
	var myCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	location = new google.maps.Marker ({
		map: map,
		position: myCoords,
		title: "You are here",
		icon: mark
	})
	location.setMap(map);
}



function handleLocationError (enabled, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(enabled ? 'Error: The geolocation service failed' :
		'Error: Your browser does not support geolocation');
	infoWindow.open(map);
}



