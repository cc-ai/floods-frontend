import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";
import {RelatedEfforts} from "./relatedEfforts";
import {InternalLink} from "../components/internalLink";

export class AboutMachineLearning extends React.Component {
	render() {
		return (
			<StaticPage name={'machine-learning'} title={'About the Machine Learning We Use'}>
				<p>
					Given a training set, Generative Adversarial Networks (GANs) learn to generate new data with the
					same statistical distribution as that set. For example, a GAN trained on many images of people can
					learn how to ‘invent’ new people who <ExternalLink href={'https://thispersondoesnotexist.com/'}>
					don’t actually exist</ExternalLink> but who look very realistic.
				</p>
				<p>
					We trained our GAN on over a thousand real images of flooded houses and streets, as well as several
					thousand simulated ones. This helped the GAN ‘learn’ what needs to be changed in an image in order
					to transform a non-flooded location to a flooded one.
				</p>
				<p>
					While our transformation will never be 100% realistic, our aim is to help you imagine what the
					location you chose may look like if it were impacted by a severe flood.
				</p>
				<p>More about GANs:</p>
				<ul>
					<li><ExternalLink href={'https://en.wikipedia.org/wiki/Generative_adversarial_network'}>Wikipedia
						article</ExternalLink></li>
					<li><ExternalLink
						href={'https://towardsdatascience.com/understanding-generative-adversarial-networks-gans-cd6e4651a29'}>Understanding
						Generative Adversarial Networks (GANs)</ExternalLink></li>
					<li><ExternalLink href={'https://papers.nips.cc/paper/5423-generative-adversarial-nets.pdf'}>Original
						GAN paper</ExternalLink> (published at NeurIPS 2014)
					</li>
				</ul>
				<p>More information about our approach:</p>
				<ul>
					<li><ExternalLink href={'https://arxiv.org/abs/1905.03709'}>Visualizing the Consequences of Climate
						Change Using Cycle-Consistent Adversarial Networks</ExternalLink></li>
					<li><ExternalLink href={'https://github.com/cc-ai/kdb'}>Our GitHub repository</ExternalLink></li>
				</ul>
				<p>Click <InternalLink page={RelatedEfforts}>here</InternalLink> to learn more
					about efforts related to ours.</p>
			</StaticPage>
		);
	}
}

AboutMachineLearning.contextType = AppContext;
AboutMachineLearning.pageName = 'AboutMachineLearning';
