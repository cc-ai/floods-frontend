import React, {Component} from 'react';
import Left from './Left';
import Right from './Right';
import {Row} from "antd"

class Banner extends Component {
    render() {
        return <Row
            style={{
                marginTop: 40,
                opacity: 0.75,
                minHeight: "300px",
                backgroundColor: "purple",
            }}
            align='middle'
            justify='center'
            type="flex"
        >
            <Left/>
            <Right/>
        </Row>
    }
}


export default Banner;