import React from 'react';
import {Logo} from "./components/logo";
import {GanifyResult} from "./pages/ganifyResult";
import {RelatedEfforts} from "./pages/relatedEfforts";
import {AppContext, AppContextInstance} from "./contexts/AppContext";
import Script from 'react-load-script';
import {getPageLink, getPageName} from "./api/utils";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import {AboutMachineLearning} from "./pages/aboutMachineLearning";
import {About} from "./pages/about";
import {Contact} from "./pages/contact";
import {FloodModels} from "./pages/floodModels";
import {Glossary} from "./pages/glossary";
import {Home} from "./pages/home";
import {HowClimateChangeCausesFlooding} from "./pages/howClimateChangeCausesFlooding";
import {HowItWorks} from "./pages/howItWorks";
import {WhatYouCanDo} from "./pages/whatYouCanDo";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.registerPage = this.registerPage.bind(this);
		this.getPageName = this.getPageName.bind(this);
		this.loadGoogleContext = this.loadGoogleContext.bind(this);
		this.state = {
			name: null,
			context: new AppContextInstance(null, null)
		};
	}

	getPageName() {
		return this.state.name;
	}

	registerPage(component) {
		this.setState({name: getPageName(component)});
	}

	loadGoogleContext() {
		this.setState({context: new AppContextInstance(this.registerPage, window.google)});
	}

	menu(title, content) {
		const active = getPageName(content) === this.getPageName();
		return (
			<Link className={`dropdown-item ${active ? 'disabled' : ''}`} to={getPageLink(content)}>
				{title}
			</Link>
		);
	}

	navMenu(title, content) {
		const active = getPageName(content) === this.getPageName();
		return (
			<li className={`nav-item ${active ? 'active' : ''}`}>
				<Link className="nav-link link" to={getPageLink(content)}>
					{title}
					{active ? (<span className="sr-only">(current)</span>) : ''}
				</Link>
			</li>
		);
	}

	route(content) {
		return <Route exact path={getPageLink(content)} component={content}/>;
	}

	render() {
		return (
			<Router>
				<AppContext.Provider value={this.state.context}>
					{this.state.context.google ? (
						<div className="container">
							<nav className="navbar navbar-expand-lg navbar-light">
								<div className="logo navbar-brand">
									<Link to={getPageLink(Home)} className={'link'}>
										<Logo/>
									</Link>
								</div>
								<button className="navbar-toggler" type="button" data-toggle="collapse"
										data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
										aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"/>
								</button>
								<div className="collapse navbar-collapse" id="navbarSupportedContent">
									<ul className="navbar-nav ml-auto">
										{this.navMenu('Home', Home)}
										<li className="nav-item dropdown">
									<span className="nav-link dropdown-toggle link" id="navbarDropdown"
										  role="button" data-toggle="dropdown" aria-haspopup="true"
										  aria-expanded="false">
										About
									</span>
											<div className="dropdown-menu" aria-labelledby="navbarDropdown">
												{this.menu('About the project', About)}
												{this.menu('Flood Models', FloodModels)}
												{this.menu('About the Machine Learning We Use', AboutMachineLearning)}
												{this.menu('How Climate Change Causes Flooding', HowClimateChangeCausesFlooding)}
												{this.menu('Glossary', Glossary)}
												{this.menu('Related Efforts', RelatedEfforts)}
											</div>
										</li>
										{this.navMenu('How it works', HowItWorks)}
										{this.navMenu('What you can do', WhatYouCanDo)}
										{this.navMenu('Contact Us', Contact)}
									</ul>
								</div>
							</nav>
							<div>
								<Switch>
									{this.route(About)}
									{this.route(AboutMachineLearning)}
									{this.route(Contact)}
									{this.route(FloodModels)}
									{this.route(GanifyResult)}
									{this.route(Glossary)}
									{this.route(Home)}
									{this.route(HowClimateChangeCausesFlooding)}
									{this.route(HowItWorks)}
									{this.route(RelatedEfforts)}
									{this.route(WhatYouCanDo)}
								</Switch>
							</div>
						</div>
					) : ''}
					<Script async defer
							url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
							onLoad={this.loadGoogleContext}/>
				</AppContext.Provider>
			</Router>
		);
	}

}
