import React, { Component } from 'react';
import { Col } from 'antd';

class Left extends Component {
    render() {
        return <Col
            xs={ 24 }
            sm={ 12 }
            style={ {
                fontSize: '3rem',
                color: "white",
                padding: 20,
                display: 'flex',
                alignItems: 'center'
            } }
        >
            This is what climate change does.<br />
            What will your house look like in 2050?
        </Col>
    }
}


export default Left;