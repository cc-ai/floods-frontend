import React from 'react';
import ReactDOM from "react-dom";
import Octicon, {Location} from "@primer/octicons-react";

export function addGoogleMapLocationControl(google, map, onClick) {
	const geolocationControl = document.createElement('div');
	geolocationControl.title = 'Center near my current location';
	geolocationControl.classList.add('google-map-geolocation-button');
	geolocationControl.index = 1;
	geolocationControl.addEventListener('click', onClick);
	ReactDOM.render(<Octicon icon={Location}/>, geolocationControl);
	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(geolocationControl);
}
