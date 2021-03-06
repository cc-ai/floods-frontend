import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {FloodModels} from "./floodModels";
import {AboutMachineLearning} from "./aboutMachineLearning";
import {InternalLink} from "../components/internalLink";

export class HowItWorks extends React.Component {
	render() {
		return (
			<StaticPage name={'how'} title={'How it works'}>
				<p>Our project has 2 main parts:</p>
				<ol>
					<li>
						<strong>The flood model:</strong> these output the probability and the water height of
						flooding at the location you entered. These outputs are based on many variables including
						precipitation, relative humidity, and temperature, and how these are likely to change in
						2050 due to the consequences of climate change.
						For more information on our flood models,
						click <InternalLink page={FloodModels}>here</InternalLink>.
					</li>
					<li>
						<strong>The Generative Adversarial Network:</strong> generative adversarial networks, or GANs,
						are a type of machine learning system that is made from two neural networks, which are
						competing with each other : one tries to generate plausible images to fool the other.
						The other tries to differentiate real and generated examples, and not let itself be fooled.
						We harness GANs to transform images of non-flooded locations to flooded
						ones - click <InternalLink page={AboutMachineLearning}>here</InternalLink> to find out how!
					</li>
				</ol>
				<p>
					In a nutshell, when you enter a location, we query our flood model to get its climate prediction in
					2050. We then take the Google StreetView image of the location and we transform it based on
					this prediction using our GAN.
				</p>
			</StaticPage>
		);
	}
}

HowItWorks.contextType = AppContext;
HowItWorks.pageName = 'HowItWorks';
