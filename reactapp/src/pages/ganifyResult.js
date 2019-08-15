import React from "react";
import {AppContext} from "../contexts/AppContext";
import PropTypes from 'prop-types';
import {Act} from "./act";
import {StaticPage} from "../components/StaticPage";
import {AddressManager} from "../components/AddressManager";
import ReactCompareImage from 'react-compare-image';

export class GanifyResult extends React.Component {
	constructor(props) {
		super(props);
		const address = props.initialAddress || '';
		const result = props.initialResult || {};
		this.state = {
			address: address,
			image: result.original ? `data:image/jpeg;base64,${result.original}` : null,
			flooded: (result.flooded || result.original) ? `data:image/jpeg;base64,${result.flooded || result.original}` : null,
			metadata: result.metadata,
			warning: result.warning,
			error: result.error
		};
		this.onSubmitted = this.onSubmitted.bind(this);
	}
	setState(state) {
		return new Promise(resolve => super.setState(state, resolve));
	}
	onSubmitted(address, result) {
		if (!result)
			return false;
		const header = 'data:application/json;base64,';
		result = JSON.parse(atob(result.substr(header.length)));
		return this.setState({
			address: address,
			image: result.original ? `data:image/jpeg;base64,${result.original}` : null,
			flooded: (result.flooded || result.original) ? `data:image/jpeg;base64,${result.flooded || result.original}` : null,
			metadata: result.metadata,
			warning: result.warning,
			error: result.error
		});
	}
	render() {
		const address = this.state.address;
		const pageLoader = this.context.pageLoader;
		const metadata = this.state.metadata ? Object.values(this.state.metadata) : null;
		if (metadata)
			metadata.sort((m1, m2) => m1.title.localeCompare(m2.title));
		return (
			<StaticPage name={'ganify'} title={address ? `${address}` : `Scenario`}>
				<div className="row">
					<div className="col-md-6">
						<AddressManager showMap={true}
										initialAddress={this.state.address}
										onSubmitted={this.onSubmitted}/>
					</div>
					<div className="col-md-6 text-center">
						{this.state.image ? (
							<ReactCompareImage key={`${address}${Math.random()}`}
											   leftImage={this.state.image}
											   rightImage={this.state.flooded}
											   leftImageAlt={'Original image'}
											   rightImageAlt={'Modified image'}/>
						) : (
							<div className="no-image">Nothing to show</div>
						)}
						{this.state.warning ? <div className="warning-message pt-4 px-2">{this.state.warning}</div> : ''}
						{this.state.error ? <div className="error-message pt-4 px-2">{this.state.error}</div> : ''}
						{metadata ? (
							<div className="my-4 metadata">{metadata.map((entry, i) => (
								<div className="row" key={i}>
									<div className="col-md-8 metadata-title">{entry.title}</div>
									<div className="col-md-4 metadata-value">{entry.value || 'N/A'}</div>
								</div>
							))}</div>
						) : ''}
						<div className="my-4">
							<button className="btn btn-secondary btn-lg px-5" onClick={() => pageLoader('act', <Act/>)}>
								<strong>Make it change : have an impact</strong>
							</button>
						</div>
					</div>
				</div>
			</StaticPage>
		);
	}
}

GanifyResult.propTypes = {
	initialAddress: PropTypes.string.isRequired,
	initialResult: PropTypes.object
};
GanifyResult.contextType = AppContext;
