// Establecer las coordenadas del destino
var destinationAddress = "Calle el Bazar, San José, Desamparados";
var destinationLatLng = {lat: 9.87136522536605, lng: -84.06301450953552};
var directionsService; //Se utilizan para manejar las direcciones y mostrar la ruta en el mapa.
var directionsDisplay; //Se utilizan para manejar las direcciones y mostrar la ruta en el mapa.

// Inicializar el mapa
function initMap() {
    var mapOptions = {
        center: destinationLatLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // Establecer el valor predeterminado en el campo de destino
    document.getElementById("to").value = destinationAddress; // Dirección como texto

    // Crear un objeto DirectionsService
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    // Colocar un marcador en el destino
    var destinationMarker = new google.maps.Marker({
        position: destinationLatLng,
        map: map,
        title: destinationAddress
    });
}

// Definir la función calcRoute
function calcRoute() {
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL//ignifica que las distancias se mostrarán en millas y pies, en lugar de kilómetros y metros.
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Distancia <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duración <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            directionsDisplay.setDirections(result);//muestra la ruta en el mapa utilizando el objeto directionsDisplay.
        } else {
            directionsDisplay.setDirections({ routes: [] });
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
}

// Crear objetos de autocompletado
var options = {
    types: ['(cities)']
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

// Inicializar el mapa al cargar la página
window.onload = initMap;