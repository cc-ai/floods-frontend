import React from "react";
import {HowItWorks} from "./howItWorks";
import {AppContext} from "../contexts/AppContext";
import {Helmet} from 'react-helmet-async';
import {Content} from "../components/content";
import {AddressManager} from "../components/AddressManager";
import {GanifyResult} from "./ganifyResult";
import {withRouter} from 'react-router-dom';
import {getPageLink} from "../api/utils";
import {InternalLink} from "../components/internalLink";

export class HomeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmitted = this.onSubmitted.bind(this);
	}

	setState(state) {
		return new Promise(resolve => super.setState(state, resolve));
	}

	onSubmitted(address, result) {
		if (result) {
			const header = 'data:application/json;base64,';
			result = JSON.parse(atob(result.substr(header.length)));
			this.props.history.push(getPageLink(GanifyResult), {
				initialAddress: address,
				initialResult: result
			});
		} else {
			this.props.history.push(getPageLink(GanifyResult), {
				initialAddress: address,
				initialResult: {}
			});
		}
		return true;
	}

	render() {
		return (
			<Content className="home">
				<Helmet>
					<title>Welcome! | CC-AI</title>
				</Helmet>
				<div className="top-text text-center text-md-left">
					Visualizing the Impacts of Climate Change
				</div>
				<div className="row">
					<div className="col-md-7 pr-md-5">
						<div className="my-5">
							<AddressManager onSubmitted={this.onSubmitted}
											showMap={true}
											guessInitialLocation={true}
											displayUserRegions={true}/>
						</div>
						<div>
							<InternalLink page={HowItWorks} className="learn-more btn btn-secondary p-3 mb-4">
								Learn more about the science
							</InternalLink>
						</div>
					</div>
					<div className="col-md-5 text-justify my-5">
						<div className="right-text">
							Enter a location of your choice and see how it could look like in 2050,
							based on the predictions made by climate models.
						</div>
					</div>
				</div>
			</Content>
		);
	}
}

HomeComponent.contextType = AppContext;
HomeComponent.pageName = 'Home';
HomeComponent.pageLink = '/';

const Home = withRouter(HomeComponent);
export {Home};
