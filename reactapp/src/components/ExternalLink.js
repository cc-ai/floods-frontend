import React from "react";
import PropTypes from 'prop-types';

export class ExternalLink extends React.Component {
	render() {
		return (<a className="external-link"
				   target="_blank" rel="noopener noreferrer"
				   href={this.props.href}>{this.props.children}</a>);
	}
}

ExternalLink.propTypes = {
	href: PropTypes.string.isRequired
};
