import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";
import {AboutMachineLearning} from "./aboutMachineLearning";
import {FloodModels} from "./floodModels";
import {HowItWorks} from "./howItWorks";
import {InternalLink} from "../components/internalLink";

export class About extends React.Component {
	render() {
		return (
			<StaticPage name={'about'} title={'About the project'}>
				<p>
					The CCAI project is an interdisciplinary effort led by Prof.
					Yoshua Bengio at <ExternalLink href={"https://mila.quebec/"}>Mila Quebec AI Institute</ExternalLink>.
				</p>
				<p>
					Using the latest techniques from <InternalLink page={AboutMachineLearning}>
					Machine Learning</InternalLink> and <InternalLink page={FloodModels}>
					Climate Science</InternalLink>, we are working on creating images of accurate, vivid, and
					personalized outcomes of climate change.
				</p>
				<p>
					Our goal is to raise awareness and conceptual understanding of climate change by bringing the
					future closer. As a prototype, we first focus on modeling flood consequences on homes.
				</p>
				<p>
					For more information on the project, click <InternalLink page={HowItWorks}>here</InternalLink>.
				</p>
			</StaticPage>
		);
	}
}

About.contextType = AppContext;
About.pageName = 'About';
