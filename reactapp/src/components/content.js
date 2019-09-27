import React from "react";
import PropTypes from "prop-types";

export class Content extends React.Component {
	render() {
		return <div className={`${this.props.className} mt-5 pt-5 mb-5`}>{this.props.children}</div>;
	}
}

Content.propTypes = {
	className: PropTypes.string
};
