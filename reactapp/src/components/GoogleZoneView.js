import React from 'react';
import PropTypes from 'prop-types';
import {AppContext} from "../contexts/AppContext";

export class GoogleZoneView extends React.Component {
	constructor(props) {
		super(props);
		this.map = null;
	}

	render() {
		return (<div><div id="google-zone-view" className="my-4"/></div>);
	}

	componentDidMount() {
		// Initialization.
		const google = this.context.google;
		const position = new google.maps.LatLng(this.props.initialLatitude, this.props.initialLongitude);
		this.map = new google.maps.Map(document.getElementById('google-zone-view'), {
			center: position,
			zoom: 15
		});
		new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: this.map,
			center: position,
			radius: 100, // in meters
		});
	}
}

GoogleZoneView.contextType = AppContext;
GoogleZoneView.propTypes = {
	initialLatitude: PropTypes.number.isRequired,
	initialLongitude: PropTypes.number.isRequired
};
