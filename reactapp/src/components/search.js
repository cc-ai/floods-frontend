import React from "react";
import {AppContext} from "../contexts/AppContext";
import Octicon, {Search as SearchIcon} from '@githubprimer/octicons-react'
import {callAutocomplete} from "../api/callAutocomplete";
import {AutoCompletionItem} from "./AutoCompletionItem";
import PropTypes from 'prop-types';

function setCaretPosition(elemId, caretPos) {
	// Reference (2019/06/13): https://stackoverflow.com/a/512542
	var element = document.getElementById(elemId);
	if (!element)
		return;
	if (element.createTextRange) {
		var range = element.createTextRange();
		range.move('character', caretPos);
		range.select();
	} else if (element.selectionStart !== undefined) {
		element.setSelectionRange(caretPos, caretPos);
	} else {
		element.focus();
	}
}

export class Search extends React.Component {
	constructor(props) {
		super(props);
		this.onInputFocus = this.onInputFocus.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onAddressChanged = this.onAddressChanged.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onSubmitAddress = this.onSubmitAddress.bind(this);
		this.choosePlace = this.choosePlace.bind(this);
		this.hasPlaces = this.hasPlaces.bind(this);
		this.onCompletionFocus = this.onCompletionFocus.bind(this);
		this.onCompletionBlur = this.onCompletionBlur.bind(this);
	}

	onInputFocus() {
		this.props.onChange({autocomplete: true});
	}

	onInputBlur() {
		if (!this.props.search.autocompleteHasFocus)
			this.props.onChange({autocomplete: false});
	}

	onCompletionFocus() {
		this.props.onChange({autocompleteHasFocus: true});
	}

	onCompletionBlur() {
		this.props.onChange({autocompleteHasFocus: false});
	}

	onAddressChanged(event) {
		const value = event.target.value;
		const update = {address: value, error: '', currentFocus: -1, autocomplete: true};
		if (!value)
			update.places = [];
		this.props.onChange(update);
		if (value) {
			callAutocomplete(value, this.context, results => {
				this.props.onChange({places: results});
			}, error => {
				console.log(error);
				this.props.onChange({places: []});
			});
		}
	}

	onKeyDown(event) {
		if (!this.hasPlaces())
			return;
		const nbPlaces = this.props.search.places.length;
		let preventDefault = false;
		let addressChanged = false;
		let address = this.props.search.address;
		let currentFocus = this.props.search.currentFocus;
		let autocomplete = this.props.search.autocomplete;
		let autocompleteHasFocus = this.props.search.autocompleteHasFocus;
		if (event.keyCode === 13) { // enter
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			console.log('ENTER');
			if (autocomplete && currentFocus !== -1) {
				address = this.props.search.places[currentFocus];
				autocomplete = autocompleteHasFocus = false;
				addressChanged = preventDefault = true;
			}
		} else if (event.keyCode === 27) { // escape
			console.log('ESCAPE');
			autocomplete = autocompleteHasFocus = false;
		} else if (event.keyCode === 40) { // down
			console.log('DOWN');
			/*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
			++currentFocus;
			if (currentFocus >= nbPlaces)
				currentFocus = 0;
			autocomplete = preventDefault = true;
		} else if (event.keyCode === 38) { //up
			console.log('UP');
			/*If the arrow UP key is pressed, decrease the currentFocus variable:*/
			--currentFocus;
			if (currentFocus < 0)
				currentFocus = nbPlaces - 1;
			autocomplete = preventDefault = true;
		}
		if (preventDefault)
			event.preventDefault();
		this.props.onChange({
			address: address,
			currentFocus: currentFocus,
			autocomplete: autocomplete,
			autocompleteHasFocus: autocompleteHasFocus
		});
		if (addressChanged && this.props.onSelect)
			this.props.onSelect(address);
	}

	onSubmitAddress(event) {
		event.preventDefault();
		const address = this.props.search.address;
		const submitButton = document.getElementById('submitButton');
		submitButton.disabled = true;
		const enableSubmitButton = () => {
			submitButton.disabled = false;
		};
		setCaretPosition('inputAddress', 0);
		this.props.onSubmit(address, enableSubmitButton);
	}

	choosePlace(currentFocus) {
		const address = this.props.search.places[currentFocus];
		this.props.onChange({
			address: address,
			currentFocus: currentFocus,
			autocomplete: false,
			autocompleteHasFocus: false
		});
		if (this.props.onSelect)
			this.props.onSelect(address);
	}

	hasPlaces() {
		return this.props.search.places.length > 0 && (this.props.search.places.length !== 1 || this.props.search.places[0] !== this.props.search.address);
	}

	render() {
		const address = this.props.search.address;
		return (
			<div className="search">
				<form id="search-form" onSubmit={this.onSubmitAddress} autoComplete="off">
					<div className="row">
						<div className="col-md-9">
							<label htmlFor="inputAddress" className="sr-only">Address</label>
							<Octicon icon={SearchIcon}/>
							<div className="autocomplete">
								<input className="form-control"
									   id="inputAddress"
									   type="text"
									   placeholder="Search an address"
									   value={address}
									   onFocus={this.onInputFocus}
									   onBlur={this.onInputBlur}
									   onKeyDown={this.onKeyDown}
									   onChange={this.onAddressChanged}/>
								{this.props.search.autocomplete && this.hasPlaces() ? (
									<div id="autocomplete-list"
										 onMouseEnter={this.onCompletionFocus}
										 onMouseLeave={this.onCompletionBlur}
										 className="autocomplete-items">
										{this.props.search.places.map((place, i) => (
											<AutoCompletionItem active={this.props.search.currentFocus === i}
																onClick={() => this.choosePlace(i)}
																value={place}
																key={i}/>))}
									</div>
								) : ''
								}
							</div>
						</div>
						<div className="col-md-3">
							<button className="btn btn-secondary btn-lg btn-block py-3" type="submit" id="submitButton">
								<strong>Go!</strong>
							</button>
						</div>
					</div>
					{(this.props.search.error &&
						<div id="error-message" className="py-2">{this.props.search.error}</div>) || ''}
				</form>
			</div>
		);
	}
}

Search.contextType = AppContext;
Search.propTypes = {
	search: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};
