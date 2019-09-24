import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class Contact extends React.Component {
	render() {
		return (
			<StaticPage name={'contact'} title={'Contact Us'}>
				<p>For more information about the project, please contact us at <ExternalLink
					href={'mailto:ccai@mila.quebec'}>ccai@mila.quebec</ExternalLink></p>
				<p>We also have a Slack workspace which we can add you to if you want to get involved!</p>
			</StaticPage>
		);
	}
}

Contact.contextType = AppContext;
