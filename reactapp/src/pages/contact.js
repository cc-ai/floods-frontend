import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class Contact extends React.Component {
	render() {
		return (
			<StaticPage name={'contact'} title={'Contact'}>
				<p>
					This project is lead by
					Sasha Luccioni (<ExternalLink href={'https://github.com/sashavor'}>@sashavor</ExternalLink>),
					Karthik Mukkavilli (<ExternalLink href={'https://github.com/mukkavilli'}>@mukkavilli</ExternalLink>),
					Vahe Vardanyan (<ExternalLink href={'https://github.com/vahe987'}>@vahe987</ExternalLink>)
					and Victor Schmidt (<ExternalLink href={'https://github.com/vict0rsch'}>@vict0rsch</ExternalLink>)
					from Mila (<ExternalLink href={'https://github.com/mila-iqia'}>@Mila-iqai</ExternalLink>),
					overseen by <ExternalLink href={'https://mila.quebec/en/yoshua-bengio/'}>Yoshua
					Bengio</ExternalLink>&nbsp;
					and <ExternalLink href={'https://www.microsoft.com/en-us/research/people/jchayes/'}>Jennifer
					Chayes</ExternalLink>.
				</p>
				<p>
					You can contact us via
					email: <code>{'{luccionis | mukkavis | schmidtv | vardanyv}'}@mila.quebec</code>
				</p>
				<p>
					We have a Slack workspace, get in touch with us so we add you to it!
				</p>
			</StaticPage>
		);
	}
}

Contact.contextType = AppContext;
