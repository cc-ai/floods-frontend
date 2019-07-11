import React from "react";
import {AppContext} from "../contexts/AppContext";
import {LoremIpsum} from "../components/LoremIpsum";
import {StaticPage} from "../components/StaticPage";

export class How extends React.Component {
	render() {
		return (
			<StaticPage name={'how'} title={'How it works'}>
				<LoremIpsum/>
			</StaticPage>
		);
	}
}

How.contextType = AppContext;
