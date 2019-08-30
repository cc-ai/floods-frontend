import React from 'react';
import {Logo} from "./components/logo";
import {Home} from "./pages/home";
import {About} from "./pages/about";
import {How} from "./pages/how";
import {Act} from "./pages/act";
import {Contact} from "./pages/contact";
import {AppContext, AppContextInstance} from "./contexts/AppContext";
import {MenuLink} from "./components/MenuLink";
import Script from 'react-load-script';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'home',
			body: <Home/>,
			context: new AppContextInstance(null, null)
		};
		this.pageLoader = this.pageLoader.bind(this);
		this.loadGoogleContext = this.loadGoogleContext.bind(this);
	}

	pageLoader(name, body) {
		this.setState({name: name, body: body});
	}

	loadGoogleContext() {
		this.setState({context: new AppContextInstance(this.pageLoader, window.google)});
	}

	render() {
		return (
			<AppContext.Provider value={this.state.context}>
				{this.state.context.google ? (
					<div className="container">
						<div className="header row align-items-center">
							<div className="logo col-md text-md-left">
								<MenuLink nav={false} center={false}
										  pageName={'home'} pageContent={<Home/>} currentPage={this.state.name}>
									<Logo/>
								</MenuLink>
							</div>
							<div className="menu col-md">
								<nav className="nav justify-content-end flex-column flex-md-row mt-3">
									<MenuLink pageName={'home'} pageContent={<Home/>} currentPage={this.state.name}>
										Home
									</MenuLink>
									<MenuLink pageName={'about'} pageContent={<About/>} currentPage={this.state.name}>
										About
									</MenuLink>
									<MenuLink pageName={'how'} pageContent={<How/>} currentPage={this.state.name}>How it
										works
									</MenuLink>
									<MenuLink pageName={'act'} pageContent={<Act/>} currentPage={this.state.name}>
										What you can do
									</MenuLink>
									<MenuLink pageName={'contact'} pageContent={<Contact/>} currentPage={this.state.name}>
										Contact
									</MenuLink>
								</nav>
							</div>
						</div>
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
