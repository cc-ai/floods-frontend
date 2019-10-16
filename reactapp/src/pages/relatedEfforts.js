import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";
import {Contact} from "./contact";
import {InternalLink} from "../components/internalLink";

export class RelatedEfforts extends React.Component {
	render() {
		return (
			<StaticPage name={'related-efforts'} title={'Related Efforts'}>
				<p>Check out some amazing initiatives around the world:</p>

				<p><ExternalLink href={'https://climatechange.ai'}>Climate Change AI</ExternalLink></p>

				<p><ExternalLink href={'https://www.microsoft.com/en-us/ai/ai-for-earth'}>Microsoft AI for
					Earth</ExternalLink></p>

				<p><ExternalLink href={'https://deepempathy.mit.edu/'}>Deep Empathy (MIT)</ExternalLink></p>

				<p><ExternalLink href={'https://stanfordmlgroup.github.io/programs/aicc-bootcamp/'}>AI for Climate
					Change Bootcamp (MIT)</ExternalLink></p>

				<p><InternalLink page={Contact}>Contact us</InternalLink> to add
					your project here!</p>
			</StaticPage>
		);
	}
}

RelatedEfforts.contextType = AppContext;
RelatedEfforts.pageName = 'RelatedEfforts';
