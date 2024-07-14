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
                
                document.getElementById('distance').innerText = `${distanceInMiles.toFixed(2)} miles`;
            }
        }
    );
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
