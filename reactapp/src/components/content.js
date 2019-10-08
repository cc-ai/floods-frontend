import React from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class ContentContainer extends React.Component {
	render() {
		console.log(this.props.location.pathname);
		return <div className={`${this.props.className} mt-5 pt-5 mb-5`}>{this.props.children}</div>;
	}
}

ContentContainer.propTypes = {
	className: PropTypes.string
};

const Content = withRouter(ContentContainer);
export {Content};
