import React, { Component } from 'react';
import { Row } from 'antd';
import Banner from './banner/Banner';

class Content extends Component {
    render() {
        return (
            <Row>
                <Banner />
            </Row>
        )
    }

}


export default Content;