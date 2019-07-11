import React from "react";
import PropTypes from "prop-types";
import {AppContext} from "../contexts/AppContext";

export class MenuLink extends React.Component {
	render() {
		const classNames = [];
		if (this.props.nav || this.props.nav === undefined)
			classNames.push('nav-link');
		if (this.props.center || this.props.center === undefined)
			classNames.push('text-center');
		if (this.props.pageName === this.props.currentPage)
			return <span className={classNames.join(' ')}>{this.props.children}</span>;
		classNames.push('link');
		return (
			<span className={classNames.join(' ')}
				  onClick={() => this.context.pageLoader(this.props.pageName, this.props.pageContent)}>
                {this.props.children}
            </span>
		);
	}
}

MenuLink.propTypes = {
	pageName: PropTypes.string.isRequired,
	pageContent: PropTypes.object.isRequired,
	currentPage: PropTypes.string.isRequired,
	nav: PropTypes.bool,
	center: PropTypes.bool
};
MenuLink.contextType = AppContext;
