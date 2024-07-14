const googleMapsApiKey = 'AIzaSyCF3FHw9ekBzKGLGR2Byh8PCej2JEFByww';
const studioAddress = '11041 Southern Blvd Suite 120, Royal Palm Beach, FL 33411';

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, { timeout: 30000, enableHighAccuracy: true });
    } else {
        document.getElementById('distance').innerText = 'Geolocation is not supported by this browser.';
    }
});

function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`, () => {
        calculateDistance(userLat, userLng);
        initMap(userLat, userLng);
    });
}

function showError(error) {
    let errorMessage = 'An unknown error occurred.';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation. Please allow location access in your browser settings and refresh the page.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please ensure your device\'s location services are enabled.';
            break;
        case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out. Please try again.';
            break;
    }
    document.getElementById('distance').innerText = errorMessage;
}

function calculateDistance(userLat, userLng) {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [{ lat: userLat, lng: userLng }],
            destinations: [studioAddress],
            travelMode: 'DRIVING',
        },
        (response, status) => {
            if (status !== 'OK') {
                document.getElementById('distance').innerText = 'Error calculating distance: ' + status;
            } else {
                const distanceText = response.rows[0].elements[0].distance.text;
                const distanceValue = response.rows[0].elements[0].distance.value;
                
                // Check if distance is in kilometers, convert to miles if so
                let distanceInMiles = distanceText.includes(' km') ? distanceValue / 1000 * 0.621371 : distanceValue * 0.000621371;
                
                document.getElementById('distance').innerText = `Distance to studio: ${distanceInMiles.toFixed(2)} miles`;
            }
        }
    );
}

function initMap(userLat, userLng) {
    const userLocation = { lat: userLat, lng: userLng };
    const studioLocation = { lat: 26.6773, lng: -80.2204 }; // Coordinates for the studio address

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: userLocation,
        disableDefaultUI: true, // Disable default UI
        mapTypeControl: false, // Disable map type control
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });

    new google.maps.Marker({
        position: userLocation,
        map: map,
        title: 'Your Location',
    });

    new google.maps.Marker({
        position: studioLocation,
        map: map,
        title: 'Studio Location',
    });

    // Draw a line between the two locations
    const line = new google.maps.Polyline({
        path: [userLocation, studioLocation],
        geodesic: true,
        strokeColor: '#FF69B4', // pink color for elegance
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    line.setMap(map);

    // Fit map to show both locations
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(userLocation);
    bounds.extend(studioLocation);
    map.fitBounds(bounds);
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
}
