var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 14
	});
	addCars();
}



function addCars () {
	var car = 'car.png';
	var location1 = new google.maps.LatLng(42.3453, -71.0464);


	var car1 = new google.maps.Marker ({
		map: map,
		position: location1,
		title: "mXfkjrFw",
		icon: car
	})

	car1.setMap(map);
};

