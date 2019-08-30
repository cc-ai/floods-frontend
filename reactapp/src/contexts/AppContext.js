import React from 'react';

function voidFunction() {}

export class AppContextInstance {
	constructor(pageLoader, google) {
		this.pageLoader = pageLoader || voidFunction;
		this.google = google || null;
		this.geocoder = google ? new google.maps.Geocoder() : null;
		this.autocomplete = google ? new google.maps.places.AutocompleteService() : null;
		this.locationToAddress = this.locationToAddress.bind(this);
		this.addressToLocation = this.addressToLocation.bind(this);
	}

	locationToAddress(position) {
		// resolve(address)
		// reject(status)
		return new Promise((resolve, reject) => {
			this.geocoder.geocode({latLng: position}, (results, status) => {
				if (status === this.google.maps.GeocoderStatus.OK)
					resolve(results[0].formatted_address);
				else
					reject(status);
			});
		});
	}

	addressToLocation(address) {
		// resolve(latLngObject)
		// reject(status)
		return new Promise((resolve, reject) => {
			this.geocoder.geocode({address: address}, (results, status) => {
				if (status === this.google.maps.GeocoderStatus.OK)
					resolve(results[0].geometry.location);
				else
					reject(status);
			});
		});
	}
}

export const AppContext = React.createContext(new AppContextInstance(null, null));
