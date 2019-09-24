import React from 'react';
import {Logo} from "./components/logo";
import {Home} from "./pages/home";
import {About} from "./pages/about";
import {HowItWorks} from "./pages/howItWorks";
import {WhatYouCanDo} from "./pages/whatYouCanDo";
import {Contact} from "./pages/contact";
import {FloodModels} from "./pages/floodModels";
import {AboutMachineLearning} from "./pages/aboutMachineLearning";
import {HowClimateChangeCausesFlooding} from "./pages/howClimateChangeCausesFlooding";
import {RelatedEfforts} from "./pages/relatedEfforts";
import {AppContext} from "./contexts/AppContext";
import {MenuLink} from "./components/MenuLink";
import Script from 'react-load-script';
import {Glossary} from "./pages/glossary";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.pageLoader = this.pageLoader.bind(this);
		this.getPageName = this.getPageName.bind(this);
		this.state = {
			body: <Home/>,
			google: null,
			geocoder: null,
			autocomplete: null
		};
	}

	getPageName() {
		return this.state.body.type.name;
	}

	pageLoader(body) {
		this.setState({body});
	}

	loadGoogleContext() {
		const google = window.google;
		const geocoder = new google.maps.Geocoder();
		const autocomplete = new google.maps.places.AutocompleteService();
		this.setState({google, geocoder, autocomplete});
	}

	menu(title, content) {
		const active = content.type.name === this.getPageName();
		return (
			<button className={`dropdown-item ${active ? 'disabled' : ''}`}
					onClick={() => this.pageLoader(content)}>
				{title}
			</button>
		);
	}

	render() {
		return (
			<AppContext.Provider value={{
				pageLoader: this.pageLoader,
				google: this.state.google,
				geocoder: this.state.geocoder,
				autocomplete: this.state.autocomplete
			}}>
				<div className="container">
					<div className="header row align-items-center">
						<div className="logo col-md text-center text-md-left">
							<MenuLink nav={false} center={false} pageContent={<Home/>} currentPage={this.getPageName()}>
								<Logo/>
							</MenuLink>
						</div>
						<div className="menu col-md text-center text-md-right align-items-center mt-md-0 mt-5">
							<div className="dropdown">
								<button className="btn btn-outline-secondary dropdown-toggle btn-block" type="button"
										id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
										aria-expanded="false">
									Climate Change AI
								</button>
								<div className="dropdown-menu dropdown-menu-right w-100"
									 aria-labelledby="dropdownMenuButton">
									{this.menu('Home', <Home/>)}
									{this.menu('About the project', <About/>)}
									{this.menu('How it works', <HowItWorks/>)}
									{this.menu('What you can do', <WhatYouCanDo/>)}
									{this.menu('Contact Us', <Contact/>)}
									{this.menu('Flood Models', <FloodModels/>)}
									{this.menu('About the Machine Learning We Use', <AboutMachineLearning/>)}
									{this.menu('How Climate Change Causes Flooding', <HowClimateChangeCausesFlooding/>)}
									{this.menu('Glossary', <Glossary/>)}
									{this.menu('Related Efforts', <RelatedEfforts/>)}
								</div>
							</div>
						</div>
					</div>
					<div>
						{this.state.body}
					</div>
					<Script async defer
							url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
							onLoad={() => this.loadGoogleContext()}/>
				</div>
			</AppContext.Provider>
		);
	}
}
