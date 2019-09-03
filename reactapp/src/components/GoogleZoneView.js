import React from 'react';
import PropTypes from 'prop-types';
import {AppContext} from "../contexts/AppContext";

export class GoogleZoneView extends React.Component {
	constructor(props) {
		super(props);
		this.map = null;
		this.currentCircle = null;
	}

	render() {
		return (
			<div>
				<div id="google-zone-view" className="mt-4"/>
				<div className="text-right mb-4">
					<span className="reload-user-location" onClick={this.props.onReload}>Relocate near me</span>
				</div>
			</div>
		);
	}

	centerMap(position) {
		const google = this.context.google;
		if (this.currentCircle) {
			this.currentCircle.setMap(null);
			this.currentCircle = null;
		}
		this.currentCircle = new google.maps.Circle({
			strokeColor: '#00FF00',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#00FF00',
			fillOpacity: 0.35,
			map: this.map,
			center: position,
			radius: 300, // in meters
		});
		this.map.panTo(position);
	}

	componentDidMount() {
		// Initialization.
		const google = this.context.google;
		const position = new google.maps.LatLng(this.props.latitude, this.props.longitude);
		this.map = new google.maps.Map(document.getElementById('google-zone-view'), {
			center: position,
			zoom: 15
		});
		this.centerMap(position);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// if (prevProps.latitude === this.props.latitude && prevProps.longitude === this.props.longitude) return;
		const position = new this.context.google.maps.LatLng(this.props.latitude, this.props.longitude);
		this.centerMap(position);
	}
}

GoogleZoneView.contextType = AppContext;
GoogleZoneView.propTypes = {
	latitude: PropTypes.number.isRequired,
	longitude: PropTypes.number.isRequired,
	onReload: PropTypes.func.isRequired
};
