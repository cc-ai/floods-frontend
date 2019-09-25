import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class FloodModels extends React.Component {
	render() {
		return (
			<StaticPage name={'flood-models'} title={'Flood Models'}>
				<p>
					Extreme weather is hard to predict, especially 30 years in the future and given the impacts that
					climate change will have on our weather systems (see “How Climate Change Causes Flooding”).
					Nonetheless, scientists around the world have been working on mapping out and quantifying the
					scale and extent of future flooding.
				</p>
				<p>
					We base ourselves on previous research done by research groups globally to estimate the probability,
					frequency and depth of flooding in North America depending on <ExternalLink
					href={'https://en.wikipedia.org/wiki/Representative_Concentration_Pathway'}>
					different global warming scenarios</ExternalLink>.
					We present this data in a visual way in order to raise awareness of the extent to which climate
					change will affect locations worldwide.
				</p>
				<p>Data sources and further information:</p>
				<ul>
					<li><ExternalLink href={'https://agupubs.onlinelibrary.wiley.com/doi/pdf/10.1002/2016EF000485'}>Global
						projections of river flood risk in a warmer world</ExternalLink></li>
					<li><ExternalLink href={'https://swot.jpl.nasa.gov/mission.htm'}>NASA SWOT mission</ExternalLink>
					</li>
					<li><ExternalLink href={'https://data.jrc.ec.europa.eu/dataset/jrc-liscoast-10009'}>European Coastal
						Flood Risk</ExternalLink></li>
					<li><ExternalLink href={'http://www.nsercfloodnet.ca/home'}>NSERC FloodNet</ExternalLink></li>
				</ul>
			</StaticPage>
		);
	}
}

FloodModels.contextType = AppContext;
FloodModels.pageName = 'FloodModels';
