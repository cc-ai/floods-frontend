import React from "react";
import {AppContext} from "../contexts/AppContext";
import PropTypes from 'prop-types';
import {WhatYouCanDo} from "./whatYouCanDo";
import {StaticPage} from "../components/StaticPage";
import {AddressManager} from "../components/AddressManager";
import ReactCompareImage from 'react-compare-image';
import {FloodModels} from "./floodModels";
import {HowClimateChangeCausesFlooding} from "./howClimateChangeCausesFlooding";

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
						{this.state.image ? (
							this.state.warning ? (
								<div>
									{this.state.warning ? <p className="warning-message">{this.state.warning}</p> : ''}
									<p>
										According to <span className="link" onClick={() => pageLoader(<FloodModels/>)}>climate predictions in 2050</span>,
										this location is not at risk of experiencing flooding.
									</p>
									<p>
										That doesn’t mean that it won’t be affected!
										Click <strong><em><u>here</u></em></strong> to find the closest
										{/* TODO Link to closest location that is flooded (if Mike or me (notoraptor) can do that) */}
										location that is liable to be flooded,
										and <span className="link" onClick={() => pageLoader(<HowClimateChangeCausesFlooding/>)}>
										here</span> to learn about how climate change will affect global weather
										patterns.
									</p>
									<p>
										This projection is based on the ‘Business as usual’ scenario
										(3 degrees warming). But this isn’t guaranteed to happen!
										Click <span className="link" onClick={() => pageLoader(<WhatYouCanDo/>)}>
										here</span> to learn what you can do to fight climate change!
									</p>
								</div>
							) : (
								<div>
									<p>
										According to <span className="link" onClick={() => pageLoader(<FloodModels/>)}>
										climate predictions in 2050</span>, this location is at risk of
										experiencing ___ cm of flooding with an average time between floods of _____.
									</p>
									<p>
										What this means is that you have a __ % chance of experiencing this kind of
										flooding in 2050, and ____ % chance of experiencing it in the 10 years
										around 2050.
									</p>
									<p>
										This projection is based on the ‘Business as usual’ scenario
										(3 degrees warming). But this isn’t guaranteed to happen!
										Click <span className="link" onClick={() => pageLoader(<WhatYouCanDo/>)}>here
									</span> to learn what you can do to fight climate change!
									</p>
								</div>
							)
						) : ''}
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
							<button className="btn btn-secondary btn-lg px-5" onClick={() => pageLoader(<WhatYouCanDo/>)}>
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
