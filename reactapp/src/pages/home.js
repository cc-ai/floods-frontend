import React from "react";
import {How} from "./how";
import {AppContext} from "../contexts/AppContext";
import Helmet from 'react-helmet';
import {Content} from "../components/content";
import {AddressManager} from "../components/AddressManager";

export class Home extends React.Component {
	render() {
		const pageLoader = this.context.pageLoader;
		return (
			<Content className="home">
				<Helmet>
					<title>Welcome! | CC-AI</title>
				</Helmet>
				<div className="row">
					<div className="col-md-7 pr-md-5">
						<div className="top-text text-center text-md-left">
							Visualizing the consequences of Climate Change
						</div>
						<div className="my-5">
							<AddressManager/>
						</div>
						<div>
							<button className="learn-more btn btn-secondary p-3 mb-4"
									onClick={() => pageLoader('how', <How/>)}>
								Learn more about the science
							</button>
						</div>
					</div>
					<div className="right-text col-md-5 align-self-center text-justify">
						This website shows you how climate change could affect our daily lives. Choose a scenario
						and a location, a climate model will run and tell you what's likely to happen and an AI
						will generate what it could look like
					</div>
				</div>
			</Content>
		);
	}
}

Home.contextType = AppContext;
