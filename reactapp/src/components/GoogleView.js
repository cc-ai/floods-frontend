import React from 'react';
import PropTypes from 'prop-types';
import {AppContext} from "../contexts/AppContext";

export class GoogleView extends React.Component {
	constructor(props) {
		super(props);
		this.currentAddress = null;
		this.currentMarker = null;
		this.streetPositionIsManual = false;
		this.map = null;
		this.places = null;
		this.defaultPosition = null;
		this.displayStreet = this.displayStreet.bind(this);
		this.displayMap = this.displayMap.bind(this);
		this.locationToAddress = this.locationToAddress.bind(this);
		this.addressToLocation = this.addressToLocation.bind(this);
		this.markMapOn = this.markMapOn.bind(this);
		this.centerMap = this.centerMap.bind(this);
		this.centerStreet = this.centerStreet.bind(this);
	}

	render() {
		return (<div>
			<div id="google-map-view" className="my-4"/>
		</div>);
	}

	streetIsVisible() {
		return this.map.getStreetView().getVisible();
	}

	displayStreet() {
		console.log(`Displaying street.`);
		this.streetPositionIsManual = true;
		this.map.getStreetView().setVisible(true);
	}

	displayMap() {
		this.map.getStreetView().setVisible(false);
	}

	locationToAddress(position) {
		// resolve(address)
		// reject(status)
		const google = this.context.google;
		const geocoder = this.context.geocoder;
		return new Promise((resolve, reject) => {
			geocoder.geocode({latLng: position}, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK)
					resolve(results[0].formatted_address);
				else
					reject(status);
			});
		});
	}

	addressToLocation(address) {
		// resolve(latLngObject)
		// reject(status)
		const google = this.context.google;
		const geocoder = this.context.geocoder;
		return new Promise((resolve, reject) => {
			geocoder.geocode({address: address}, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK)
					resolve(results[0].geometry.location);
				else
					reject(status);
			});
		});
	}

	searchAddress(query, nearLocation) {
		// resolve(address)
		// reject(status)
		const google = this.context.google;
		return new Promise((resolve, reject) => {
			const request = {
				query: query,
				fields: ['formatted_address', 'geometry', 'name'],
				locationBias: new google.maps.Circle({
					center: nearLocation,
					radius: 10
				})
			};
			this.places.findPlaceFromQuery(request, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK && results.length)
					resolve(results[0].formatted_address);
				else
					reject(status);
			});
		});
	}

	markMapOn(position) {
		const google = this.context.google;
		if (this.currentMarker) {
			this.currentMarker.setMap(null);
			this.currentMarker = null;
		}
		this.currentMarker = new google.maps.Marker({position: position, map: this.map});
	}

	centerMap(position) {
		console.log(`Centering map to ${position.lat()} ; ${position.lng()}`);
		this.markMapOn(position);
		this.map.panTo(position);
	}

	centerStreet(position) {
		console.log(`Centering street to ${position.lat()} ; ${position.lng()}`);
		this.streetPositionIsManual = true;
		this.map.getStreetView().setPosition(position);
	}

	_createMapOn(defaultPosition) {
		const google = this.context.google;
		this.map = new google.maps.Map(document.getElementById('google-map-view'), {
			center: defaultPosition,
			zoom: 15
		});
		this.places = new google.maps.places.PlacesService(this.map);
		this.map.addListener('click', (ev) => {
			const position = ev.latLng;
			this.centerMap(position);
			this.locationToAddress(position)
				.then(address => {
					this.currentAddress = address;
					this.props.onSelect(address)
				});
		});
		this.map.getStreetView().addListener('position_changed', () => {
			if (this.streetPositionIsManual) {
				return;
			}
			console.log(`Handling changed position on street.`);
			const location = this.map.getStreetView().getLocation();
			this.centerMap(location.latLng);
			this.searchAddress(location.description, location.latLng)
				.then(address => {
					this.currentAddress = address;
					this.props.onSelect(address)
				});
		});
		const streetControl = document.createElement('div');
		streetControl.classList.add('google-map-street-button');
		streetControl.textContent = 'street';
		streetControl.index = 1;
		streetControl.addEventListener('click', () => {
			if (this.currentMarker) {
				const position = this.currentMarker.getPosition();
				this.centerStreet(position);
				this.displayStreet();
			}
		});
		this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(streetControl);
		document.getElementById('google-map-view').addEventListener('click', () => {
			if (this.streetIsVisible()) {
				console.log(`Clicked on street!`);
				this.streetPositionIsManual = false;
			}
		});
	}

	componentDidMount() {
		// Initialization.
		const google = this.context.google;
		// Use Montreal coordinates as default coordinates.
		const defaultPosition = new google.maps.LatLng(45.505331312, -73.55249779);
		this.defaultPosition = defaultPosition;
		if (this.props.address) {
			this.addressToLocation(this.props.address)
				.catch(error => {
					console.log(`Error while location for address ${this.props.address}:`, error);
					return this.defaultPosition;
				})
				.then(position => {
					this.currentAddress = this.props.address;
					this._createMapOn(position);
					this.centerMap(position);
					this.centerStreet(position);
					this.displayMap();
				})
		} else {
			this._createMapOn(defaultPosition);
			this.locationToAddress(defaultPosition)
				.then(address => {
					this.currentAddress = address;
					this.centerMap(defaultPosition);
					this.centerStreet(defaultPosition);
					this.displayMap();
				});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!this.props.address
			|| prevProps.address === this.props.address
			|| this.currentAddress === this.props.address)
			return;
		this.addressToLocation(this.props.address)
			.catch(error => {
				console.log(`Error while location for address ${this.props.address}:`, error);
				return this.defaultPosition;
			})
			.then(position => {
				this.currentAddress = this.props.address;
				if (this.streetIsVisible())
					this.centerStreet(position);
				else
					this.centerMap(position);
			})
	}
}

GoogleView.contextType = AppContext;
GoogleView.propTypes = {
	address: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};
