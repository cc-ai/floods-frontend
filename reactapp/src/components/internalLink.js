import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {getPageLink} from "../api/utils";

export class InternalLink extends React.Component {
	render() {
		return <Link className="internal-link" to={getPageLink(this.props.page)}>{this.props.children}</Link>;
	}
}

InternalLink.propTypes = {
	page: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};
