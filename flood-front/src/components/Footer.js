import React, { Component } from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;


class _Footer extends Component {
    render() {
        return <Footer style={ {
            textAlign: 'center',
            clear: "both",
            position: "absolute",
            height: "40px",
            bottom: 0,
            width: "100%",
        } } color="secondary">
            CCAI ©2018 Created by Victor Schmidt
        </Footer>
    }
}


export default _Footer;