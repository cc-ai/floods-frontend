import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";
import {Glossary} from "./glossary";

export class HowClimateChangeCausesFlooding extends React.Component {
	render() {
		return (
			<StaticPage name={'how-climate-change-causes-flooding'} title={'How Climate Change Causes Flooding'}>
				<p>
					Rising global temperatures impact weather patterns globally. On one hand, more heat causes more
					evaporation, which rises into the atmosphere and can provoke more intense rainfall and storms.
					On the other, more heat also causes rising sea levels, which can in turn lead to higher storm
					surges and more flooding.
				</p>
				<p>
					Click <span className="link" onClick={() => this.context.pageLoader(<Glossary/>)}>here</span> to
					learn about key terms and concepts linked to climate change.
				</p>
				<p>To learn more about changing flood patterns and flood predictions, check out the following links:</p>
				<ul>
					<li><ExternalLink
						href={'https://www.nrdc.org/stories/flooding-and-climate-change-everything-you-need-know'}>Flooding
						and Climate Change: Everything You Need to Know (NRDC)</ExternalLink></li>
					<li><ExternalLink href={'https://changingclimate.ca/CCCR2019/chapter/4-0/'}>Changes in Temperature
						and Precipitation Across Canada (CCCR2019)</ExternalLink></li>
					<li><ExternalLink
						href={'https://climate.nasa.gov/news/2881/earths-freshwater-future-extremes-of-flood-and-drought/'}>Earth's
						Freshwater Future: Extremes of Flood and Drought (NASA)</ExternalLink></li>
				</ul>
			</StaticPage>
		);
	}
}

HowClimateChangeCausesFlooding.contextType = AppContext;
HowClimateChangeCausesFlooding.pageName = 'HowClimateChangeCausesFlooding';
