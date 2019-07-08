import React, {Component} from 'react';
import {Helmet} from "react-helmet";

class Header extends Component {

    render() {
        return (
            <Helmet>
                <title>CCAI: Visceralizing Climate Change</title>
                <meta name="description"
                      content="The Climate Change AI project aims at creating accurate, compelling and engaging visuals to increase public concern and political support for Climate Change actions"/>
            </Helmet>
        )
    }
}


export default Header;
