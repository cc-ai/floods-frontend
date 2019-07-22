import React from "react";
import {AppContext} from "../contexts/AppContext";
import PropTypes from 'prop-types';
import {Act} from "./act";
import {StaticPage} from "../components/StaticPage";
import {AddressManager} from "../components/AddressManager";
import ReactCompareImage from 'react-compare-image';

export class GanifyResult extends React.Component {
	render() {
		const address = this.props.address;
		const pageLoader = this.context.pageLoader;
		return (
			<StaticPage name={'ganify'} title={address ? `${address}` : `Scenario`}>
				<div className="row">
					<div className="col-md-6">
						<AddressManager showMap={true} initialAddress={this.props.address}/>
					</div>
					<div className="col-md-6 text-center">
						{address ? (
							<ReactCompareImage leftImage={this.props.image}
											   key={address}
											   rightImage={this.props.image}
											   leftImageAlt={'Original image'}
											   rightImageAlt={'Modified image'}
											   rightImageCss={{
												   "-webkit-filter": "grayscale(100%)",
												   filter: "grayscale(100%)"
											   }}/>
						) : (
							<div className="no-image">No address to show</div>
						)}
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
	address: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired
};
GanifyResult.contextType = AppContext;
