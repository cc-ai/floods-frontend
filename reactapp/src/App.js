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
import {AppContext, AppContextInstance} from "./contexts/AppContext";
import {MenuLink} from "./components/MenuLink";
import Script from 'react-load-script';
import {Glossary} from "./pages/glossary";
import {getPageName} from "./api/utils";

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.pageLoader = this.pageLoader.bind(this);
		this.getPageName = this.getPageName.bind(this);
		this.loadGoogleContext = this.loadGoogleContext.bind(this);
		this.state = {
			body: <Home/>,
			context: new AppContextInstance(null, null)
		};
	}

	getPageName() {
		return getPageName(this.state.body);
	}

	pageLoader(body) {
		this.setState({body});
	}

	loadGoogleContext() {
		this.setState({context: new AppContextInstance(this.pageLoader, window.google)});
	}

	menu(title, content) {
		const active = getPageName(content) === this.getPageName();
		return (
			<button className={`dropdown-item ${active ? 'disabled' : ''}`}
					onClick={() => this.pageLoader(content)}>
				{title}
			</button>
		);
	}

	navMenu(title, content) {
		const active = getPageName(content) === this.getPageName();
		return (
			<li className={`nav-item ${active ? 'active' : ''}`}>
				<span className="nav-link link" onClick={() => this.pageLoader(content)}>
					{title}
					{active ? (<span className="sr-only">(current)</span>) : ''}
				</span>
			</li>
		);
	}

	render() {
		return (
			<AppContext.Provider value={this.state.context}>
				{this.state.context.google ? (
					<div className="container">
						<nav className="navbar navbar-expand-lg navbar-light">
							<div className="logo navbar-brand">
								<MenuLink nav={false} center={false} pageContent={<Home/>} currentPage={this.getPageName()}>
									<Logo/>
								</MenuLink>
							</div>
							<button className="navbar-toggler" type="button" data-toggle="collapse"
									data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
									aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"/>
							</button>
							<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav ml-auto">
									{this.navMenu('Home', <Home/>)}
									<li className="nav-item dropdown">
									<span className="nav-link dropdown-toggle link" id="navbarDropdown"
										  role="button" data-toggle="dropdown" aria-haspopup="true"
										  aria-expanded="false">
										About
									</span>
										<div className="dropdown-menu" aria-labelledby="navbarDropdown">
											{this.menu('About the project', <About/>)}
											{this.menu('Flood Models', <FloodModels/>)}
											{this.menu('About the Machine Learning We Use', <AboutMachineLearning/>)}
											{this.menu('How Climate Change Causes Flooding', <HowClimateChangeCausesFlooding/>)}
											{this.menu('Glossary', <Glossary/>)}
											{this.menu('Related Efforts', <RelatedEfforts/>)}
										</div>
									</li>
									{this.navMenu('How it works', <HowItWorks/>)}
									{this.navMenu('What you can do', <WhatYouCanDo/>)}
									{this.navMenu('Contact Us', <Contact/>)}
								</ul>
							</div>
						</nav>
						<div>
							{this.state.body}
						</div>
					</div>
				) : ''}
				<Script async defer
						url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
						onLoad={this.loadGoogleContext}/>

			</AppContext.Provider>
		);
	}
}
