function geolocationError(message) {
	return {geolocationError: message};
}

export function geotag() {
	// resolve(coords)
	// reject(errorMessage)
	return new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				resolve(position.coords);
			}, function (error) {
				let message = null;
				switch (error.code) {
					case error.PERMISSION_DENIED:
						message = "Geolocation is not allowed in your browser.";
						break;
					case error.POSITION_UNAVAILABLE:
						message = "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						message = "The request to get user location timed out.";
						break;
					case error.UNKNOWN_ERROR:
						message = "An unknown error occurred.";
						break;
					default:
						message = "An error occurred without any error code.";
						break;
				}
				reject(geolocationError(message));
			});
		} else {
			reject(geolocationError("Geolocation is not available in your browser."));
		}
	});
}
