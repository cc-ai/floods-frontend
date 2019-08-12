import React from "react";
import PropTypes from "prop-types";
import {Search} from "./search";
import {ganify} from "../api/ganify";
import {GanifyResult} from "../pages/ganifyResult";
import {AppContext} from "../contexts/AppContext";
import {GoogleView} from "./GoogleView";

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
			// address manager
			selectedAddress: initialAddress
		};
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSelectSearchAddress = this.onSelectSearchAddress.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onSelectMapAddress = this.onSelectMapAddress.bind(this);
	}

	onSelectMapAddress(address) {
		console.log(`Selected from map: ${address}`);
		this.setState({selectedAddress: address, address: address});
	}

	onSelectSearchAddress(address) {
		console.log(`Selected from search; ${address}`);
		this.setState({selectedAddress: address});
	}

	onSearchChange(newState) {
		this.setState(newState);
	}

	onSearchSubmit(address, finallyFn) {
		this.onSelectSearchAddress(address);
		const pageLoader = this.context.pageLoader;
		if (address) {
			ganify(
				address,
				(result) => {
					this.setState({error: ''});
					pageLoader('ganify', <GanifyResult address={address} image={result}/>);
					if (finallyFn)
						finallyFn();
				},
				(error) => {
					this.setState({error: `Image processing error: ${error}`});
					if (finallyFn)
						finallyFn();
				}
			);
		} else {
			pageLoader('ganify', <GanifyResult address={address} image={''}/>);
			if (finallyFn)
				finallyFn();
		}
	}

	render() {
		return (
			<div>
				<Search search={this.state}
						onChange={this.onSearchChange}
						onSelect={this.onSelectSearchAddress}
						onSubmit={this.onSearchSubmit}/>
				{this.props.showMap ?
					<GoogleView address={this.state.selectedAddress}
								onSelect={this.onSelectMapAddress}/>
					: ''}
			</div>
		);
	}
}

AddressManager.propTypes = {
	initialAddress: PropTypes.string,
	showMap: PropTypes.bool,
};
AddressManager.contextType = AppContext;
