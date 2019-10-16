import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class WhatYouCanDo extends React.Component {
	render() {
		return (
			<StaticPage name={'act'} title={'What you can do'}>
				<p>
					Daily decisions made by individuals are part of our global effort to fight climate change.
					There are many decisions that are within our research, such as:
				</p>
				<ol>
					<li>
						<strong>Driving and flying less</strong>: going car-free and reducing the amount of flights
						that you take can reduce your carbon emissions by <ExternalLink
						href={'https://data.oecd.org/air/air-and-ghg-emissions.htm'}>
						a quarter in developing countries</ExternalLink>.
					</li>
					<li>
						<strong>Changing what you eat</strong>: by reducing your consumption of animal protein by half,
						you can cut your diet's carbon footprint <ExternalLink
						href={'https://www.wri.org/blog/2016/04/sustainable-diets-what-you-need-know-12-charts'}>
						by more than 40%</ExternalLink>.
					</li>
					<li>
						<strong>Shop differently</strong>: by buying <ExternalLink
						href={'https://www.carbontrust.com/media/38358/ctc793-international-carbon-flows-clothing.pdf'}>
						less</ExternalLink> and buying <ExternalLink href={'http://shrinkthatfootprint.com/food-miles'}>
						local</ExternalLink>, you can reduce the carbon footprint of your shopping habits.
					</li>
					<li>
						<strong>Offsetting</strong>: consider signing up for a <ExternalLink
						href={'https://projectwren.com/'}>
						monthly subscription</ExternalLink> or a <ExternalLink href={'https://www.goldstandard.org/'}>
						one-off payment</ExternalLink> to offset the emissions that you can’t cut down.
					</li>
				</ol>
				<p>
					How much power does a single individual have? A lot! Research has found that:
				</p>
				<ul>
					<li>
						People will fly less when they know someone who has given up flying because of climate change [
						<ExternalLink
							href={'https://drive.google.com/file/d/1GHMzLpkPVJ-a2fifjswLxxqAqTEllVNs/view'}>source</ExternalLink>]
					</li>
					<li>
						Customers at a cafe who were told that 30% of Americans have reduced their meat consumption
						were twice as likely to order a vegetarian meal [<ExternalLink
						href={'https://journals.sagepub.com/doi/abs/10.1177/0956797617719950'}>
						source</ExternalLink>]
					</li>
					<li>
						Solar panels are contagious - households in California were more likely to install solar panels
						if their neighbors already took that step [<ExternalLink
						href={'https://www.nature.com/articles/s41586-018-0647-4'}>
						source</ExternalLink>]
					</li>
				</ul>
				<p>
					Finally, remember that just <ExternalLink
					href={"https://b8f65cb373b1b7b15feb-c70d8ead6ced550b4d987d7c03fcdd1d.ssl.cf3.rackcdn.com/cms/reports/documents/000/002/327/original/Carbon-Majors-Report-2017.pdf?1499691240"}>
					100 companies in the world are responsible for over 70 percent of global emissions</ExternalLink>.
					By consuming more carefully and consciously, choosing companies that act
					responsibly, and voting for governments that hold companies accountable for their environmental
					practices, our actions will influence the planet for the coming decades and centuries.
				</p>
				<p>More resources:</p>
				<ul>
					<li>The Intergovernmental Panel on Climate Change reports - <ExternalLink
						href={"https://www.ipcc.ch/"}>
						IPCC website
					</ExternalLink></li>
					<li><ExternalLink href={"https://climateatlas.ca/"}>
						Climate Change Atlas of Canada
					</ExternalLink> - presenting the impacts of climate change in Canada
					</li>
					<li><ExternalLink href={"https://www.drawdown.org/"}>Project Drawdown</ExternalLink> - a research
						organization that reviews, analyses, and identifies the most viable global climate solutions.
					</li>
					<li>Individual action on climate change - <ExternalLink
						href={"https://en.wikipedia.org/wiki/Individual_action_on_climate_change"}>
						Wikipedia page
					</ExternalLink></li>
				</ul>
			</StaticPage>
		);
	}
}

WhatYouCanDo.contextType = AppContext;
WhatYouCanDo.pageName = 'WhatYouCanDo';
