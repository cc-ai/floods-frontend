import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";
import {AboutMachineLearning} from "./aboutMachineLearning";
import {FloodModels} from "./floodModels";
import {HowItWorks} from "./howItWorks";

export class About extends React.Component {
	render() {
		return (
			<StaticPage name={'about'} title={'About the project'}>
				<p>
					The CCAI project is an interdisciplinary effort led by Prof.
					Yoshua Bengio at <ExternalLink href={"https://mila.quebec/"}>Mila Quebec AI Institute</ExternalLink>.
				</p>
				<p>
					Using the latest techniques from <span className="link" onClick={() => this.context.pageLoader(
					<AboutMachineLearning/>)}>Machine Learning</span> and <span className="link" onClick={() => this.context.pageLoader(<FloodModels/>)}>
					Climate Science</span>, we are working on creating images of accurate, vivid, and personalized outcomes of climate change.
				</p>
				<p>
					Our goal is to raise awareness and conceptual understanding of climate change by bringing the
					future closer. As a prototype, we first focus on modeling flood consequences on homes.
				</p>
				<p>
					For more information on the project, click <span className="link" onClick={() => this.context.pageLoader(<HowItWorks/>)}>here</span>.
				</p>
			</StaticPage>
		);
	}
}

About.contextType = AppContext;
About.pageName = 'About';
