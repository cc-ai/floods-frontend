import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {getPageLink, getPageName} from "../api/utils";
import {AppContext} from "../contexts/AppContext";

export class InternalLink extends React.Component {
	constructor(props) {
		super(props);
		this.register = this.register.bind(this);
	}

	register() {
		this.context.registerPage(this.props.page);
	}

	render() {
		if (this.props.currentPageName === getPageName(this.props.page))
			return this.props.children;
		return (
			<Link className={`${this.props.removeDefaultClass ? '' : 'internal-link'} ${this.props.className || ''}`}
				  to={getPageLink(this.props.page)}
				  onClick={this.register}>
				{this.props.children}
			</Link>
		);
	}
}

InternalLink.propTypes = {
	page: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
	className: PropTypes.string,
	removeDefaultClass: PropTypes.bool,
	currentPageName: PropTypes.string,
};
InternalLink.contextType = AppContext;
