import React from 'react';
import PropTypes from 'prop-types';
import {AppContext} from "../contexts/AppContext";
import {addGoogleMapLocationControl} from "../api/googleMapLocationControl";
import {CancelablePromise} from "../api/cancelablePromise";
import {geotag} from "../api/geotag";

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
		this.markMapOn = this.markMapOn.bind(this);
		this.centerMap = this.centerMap.bind(this);
		this.centerStreet = this.centerStreet.bind(this);
		this.getUserLocation = this.getUserLocation.bind(this);
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
			zoom: 15,
			streetViewControl: false,
		});
		this.places = new google.maps.places.PlacesService(this.map);
		this.map.addListener('click', (ev) => {
			const position = ev.latLng;
			this.centerMap(position);
			this.context.locationToAddress(position)
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
		streetControl.textContent = 'Street';
		streetControl.index = 1;
		streetControl.addEventListener('click', () => {
			if (this.currentMarker) {
				const position = this.currentMarker.getPosition();
				this.centerStreet(position);
				this.displayStreet();
			}
		});
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(streetControl);
		addGoogleMapLocationControl(google, this.map, this.getUserLocation);
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
			this.context.addressToLocation(this.props.address)
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
			this.context.locationToAddress(defaultPosition)
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
		this.context.addressToLocation(this.props.address)
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

	getUserLocation() {
		if (this.cancelablePromise)
			return;
		this.cancelablePromise = new CancelablePromise(geotag());
		this.cancelablePromise
			.promise
			.then((coords) => {
				if (!this.streetIsVisible()) {
					const lat = coords.latitude;
					const lng = coords.longitude;
					console.log(`Geolocation returned ${lat} ${lng}`);
					const position = new this.context.google.maps.LatLng(lat, lng);
					this.centerMap(position);
					this.context.locationToAddress(position)
						.then(address => {
							this.currentAddress = address;
							this.props.onSelect(address);
						});
				}
			})
			.catch(error => {
				if ('isCanceled' in error) {
					console.error('Geolocation was canceled.');
				} else if ("geolocationError" in error) {
					console.error(`Geolocation error. ${error.geolocationError}`);
				} else {
					console.error(`Error when getting user location. ${error}`);
				}
			})
			.finally(() => {
				this.cancelablePromise = null;
			});
	}

	componentWillUnmount() {
		if (this.cancelablePromise)
			this.cancelablePromise.cancel();
	}
}

GoogleView.contextType = AppContext;
GoogleView.propTypes = {
	address: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};
