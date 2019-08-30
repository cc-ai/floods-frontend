import React from "react";
import PropTypes from "prop-types";
import {Search} from "./search";
import {promiseGanify} from "../api/ganify";
import {AppContext} from "../contexts/AppContext";
import {GoogleView} from "./GoogleView";
import {GoogleZoneView} from "./GoogleZoneView";
import {RingLoader} from "react-spinners";
import {geotag} from "../api/geotag";
import {CancelablePromise} from "../api/cancelablePromise";


export class AddressManager extends React.Component {
	constructor(props) {
		super(props);
		const initialAddress = props.initialAddress || '';
		this.state = {
			// search
			address: initialAddress,
			places: [],
			currentFocus: -1,
			autocomplete: true,
			autocompleteHasFocus: false,
			error: '',
			wait: false,
			// address manager
			selectedAddress: initialAddress,
			geolocation: null
		};
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSelectSearchAddress = this.onSelectSearchAddress.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onSelectMapAddress = this.onSelectMapAddress.bind(this);
		this.onSubmitted = this.onSubmitted.bind(this);
	}

	setState(state) {
		return new Promise(resolve => super.setState(state, resolve));
	}

	onSelectMapAddress(address) {
		console.log(`Selected from map: ${address}`);
		return this.setState({selectedAddress: address, address: address, error: ''});
	}

	onSelectSearchAddress(address) {
		console.log(`Selected from search; ${address}`);
		return this.setState({selectedAddress: address, error: ''});
	}

	onSearchChange(newState) {
		return this.setState(newState);
	}

	onSubmitted(address, result) {
		if (this.props.onSubmitted)
			return this.props.onSubmitted(address, result);
		return false;
	}

	onSearchSubmit(address) {
		return this.onSelectSearchAddress(address)
			.then(() => this.setState({wait: true}))
			.then(() => promiseGanify(address))
			.then(result => this.setState({wait: false}).then(() => this.onSubmitted(address, result)))
			.catch(error => this.setState({wait: false, error: `Image processing error: ${error}`}).then(() => this.onSubmitted(address, null)));
	}

	render() {
		return (
			<div>
				<Search search={this.state}
						onChange={this.onSearchChange}
						onSelect={this.onSelectSearchAddress}
						onSubmit={this.onSearchSubmit}/>
				{this.state.error ? <div className="error-message pt-4 px-2">{this.state.error}</div> : ''}
				<div className={`text-center search-waiting-${this.state.wait ? 'yes' : 'no'}`}>
					<div>
						<RingLoader css={{margin: "auto"}}/>
					</div>
					<div className="mt-3"><strong>We are computing predictions. This may take some seconds ...</strong></div>
				</div>
				{this.props.showMap ?
					<GoogleView address={this.state.selectedAddress}
								onSelect={this.onSelectMapAddress}/>
					: ''}
				{this.state.geolocation ?
					<GoogleZoneView initialLatitude={this.state.geolocation.latitude}
									initialLongitude={this.state.geolocation.longitude}/>
					: ''}
			</div>
		);
	}

	componentDidMount() {
		if (this.props.guessLocation) {
			this.cancelablePromise = new CancelablePromise(geotag());
			this.cancelablePromise
				.promise
				.catch(errorMessage => {
					if ('isCanceled' in errorMessage) {
						console.error('Geolocation was canceled.');
					} else {
						console.error(`Geolocation error. ${errorMessage}`);
					}
					return null;
				})
				.then((coords) => {
					if (coords) {
						const lat = coords.latitude;
						const lng = coords.longitude;
						console.log(`Geolocation returned ${lat} ${lng}`);
						this.setState({geolocation: coords})
							.then(() => {
								return this.context.locationToAddress(new this.context.google.maps.LatLng(lat, lng));
							})
							.then(address => {
								console.log(`Geolocated at ${address}`);
								return this.onSelectMapAddress(address);
							})
							.catch(error => {
								console.error(`Error when converting geolocation to address. ${error}`);
							})
					}
				});
		}
	}

	componentWillUnmount() {
		if (this.cancelablePromise)
			this.cancelablePromise.cancel();
	}
}

AddressManager.propTypes = {
	onSubmitted: PropTypes.func,
	initialAddress: PropTypes.string,
	showMap: PropTypes.bool,
	guessLocation: PropTypes.bool,
};
AddressManager.contextType = AppContext;
