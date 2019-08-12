import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class About extends React.Component {
	render() {
		return (
			<StaticPage name={'about'} title={'About'}>
				<p>
					The CCAI project is an interdisciplinary project aimed at creating images of accurate,
					vivid, and personalized outcomes of climate change. Our goal is to use cutting-edge
					machine learning techniques to produce images of how neighborhoods and houses will look
					like following the effects of global warming. By creating a more visceral understanding
					of the effects of climate change, we aim to strengthen public support for necessary
					actions and motivate people to make impactful decisions. As a prototype, we first focus
					on modeling flood consequences on homes.
				</p>
				<p>
					Our project aims to raise awareness and conceptual understanding
					of climate change by bringing the future closer. More info&nbsp;
					<ExternalLink href={'https://mila.quebec/en/ai-society/visualizing-climate-change/'}>
						here</ExternalLink>.
				</p>
			</StaticPage>
		);
	}
}

About.contextType = AppContext;
