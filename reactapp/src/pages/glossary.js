import React from "react";
import {AppContext} from "../contexts/AppContext";
import {StaticPage} from "../components/StaticPage";
import {ExternalLink} from "../components/ExternalLink";

export class Glossary extends React.Component {
	render() {
		return (
			<StaticPage name={'glossary'} title={'Glossary'}>
				<p>This section will present some of the important concepts to better understand climate change:</p>

				<h4>CO<sub>2</sub></h4>
				<p>
					At the center of the climate crisis is a commonplace but very important concept: that of carbon
					dioxide (CO<sub>2</sub>), low amounts of which occur naturally in the Earth's atmosphere, but its
					concentration has been rapidly increasing due to human activity. This increase is dangerous because
					of CO<sub>2</sub>’s effect as a greenhouse gas, meaning that it absorbs and emits infrared radiation
					in the wavelength range emitted by the Earth, which contributes to the global warming of the planet
					(<ExternalLink href={'https://www.ipcc.ch/site/assets/uploads/2018/02/WGIIAR5-AnnexII_FINAL.pdf'}>
						IPCC Glossary
					</ExternalLink>).
				</p>
				<hr/>

				<h4>CO<sub>2</sub> eq.</h4>
				<p>
					Since other gases such as methane, nitrous oxide or even water vapor also have this warming effect,
					a standardized measure for describing how much warming a given amount of gas will have is often
					provided in CO<sub>2</sub>-equivalents (CO<sub>2</sub>eq), for simplification purposes. For
					instance, the carbon intensity of transportation is measured in grams of CO<sub>2</sub>-equivalent
					per person-km, whereas the carbon intensity of energy is measured in grams of
					CO<sub>2</sub>-equivalent per kilowatt hour.
				</p>
				<hr/>

				<h4>Renewable vs. Nonrenewable Energy</h4>
				<p>
					A key distinction to be made is that between renewable and nonrenewable energy sources. Renewable
					energy is collected from sources which are naturally replenished on a human timescale: this
					includes wind, sunlight, tides, geothermal heat, etc. In contrast, nonrenewable energy sources
					such as coal and petrol are not naturally replenished after their usage, and can take millions of
					years to be formed again. Finally, not all renewable energy sources are carbon-free, since the
					burning of biomass (such as plants or algae) still produces CO<sub>2</sub>-equivalents.
				</p>
				<hr/>

				<h4>Carbon Offsetting</h4>
				<p>
					Carbon offsetting is a reduction in emissions of CO<sub>2</sub>-equivalents that is made in order to
					compensate for the emissions made by another actor. The money paid via carbon offsetting is
					invested towards different types of projects, including renewable energy or energy efficiency,
					carbon sequestration, methane abatement, among others. These projects are run by private companies,
					more often than not in a different place than where the offsetting is carried out. A large part of
					carbon offsetting goes towards funding renewable energy projects such as building wind or solar
					farms, hydroelectric dams, and extracting biofuel, in the hopes of reducing the cost of
					renewable production.
				</p>
				<hr/>

				<h4>Renewable Energy Credits</h4>
				<p>
					An indirect form of offsetting that is often used by large companies is the purchasing of Renewable
					Energy Credits (RECs), which involves directly purchasing quantities of energy produced by renewable
					sources. This is considered to be an indirect of offsetting because in order to convert RECs into
					offsets, the energy purchased is translated into carbon reductions under the assumption that the
					clean energy is displacing an equivalent amount of electricity produced by non-renewable methods.
					Other commonly used forms of carbon offsetting include reforestation, sequestration, replacement of
					legacy equipment such as coal-burning stoves by more modern ones, etc.
				</p>
				<hr/>

				<h4>Carbon Neutral</h4>
				<p>
					‘Carbon Neutral’ is a term used to indicate a net zero carbon footprint of an individual or
					organization. While a small part of carbon-neutral entities rely entirely on renewable energy that
					is zero-carbon, the large majority of entities balance their emissions of CO<sub>2</sub>-equivalents,
					using approaches such as carbon offsetting or the purchase of RECs. Many major technology companies
					such as Google and Microsoft are carbon-neutral, matching 100% of their electricity use with
					renewable energy purposes (Google, 2018; Microsoft, 2018). This does not mean, however, that their
					operations do not produce CO<sub>2</sub>-equivalents, since this is dependent on the energy sources
					of the locations in which their infrastructure is located.
				</p>
			</StaticPage>
		);
	}
}

Glossary.contextType = AppContext;
Glossary.pageName = 'Glossary';
