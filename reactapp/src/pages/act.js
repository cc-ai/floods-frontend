import React from "react";
import {AppContext} from "../contexts/AppContext";
import {LoremIpsum} from "../components/LoremIpsum";
import {StaticPage} from "../components/StaticPage";

export class Act extends React.Component {
	render() {
		return (
			<StaticPage name={'act'} title={'What you can do'}>
				<LoremIpsum/>
			</StaticPage>
		);
	}
}

Act.contextType = AppContext;
