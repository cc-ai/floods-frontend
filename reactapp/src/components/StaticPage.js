import React from 'react';
import {Helmet} from 'react-helmet-async';
import PropTypes from 'prop-types';
import {Content} from "./content";

export class StaticPage extends React.Component {
	render() {
		return (
			<Content className={this.props.name}>
				<Helmet>
					<title>{this.props.title} | CC-AI</title>
				</Helmet>
				<h1>{this.props.title}</h1>
				{this.props.children}
			</Content>
		);
	}
}

StaticPage.propTypes = {
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};
