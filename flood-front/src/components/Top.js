import React, { Component } from 'react';
import { Menu, Row, Col, Typography } from 'antd';

const { Title } = Typography;

class Top extends Component {
    render() {
        return (
            <Row gutter={ 32 } type="flex" justify="space-between" align="middle"
                style={ {
                    boxShadow: "10px 1px 8px rgba(0, 0, 0, .5)",
                    minHeight: 80,
                    backgroundColor: "white"
                } }
            >
                <Col span={ 12 } style={{padding: 20}}>
                    <Title level={ 1 } style={ {
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: 400,
                        marginBottom: 0
                    } }>Climate Change AI</Title>
                </Col>
                <Col span={ 12 }>
                    <Menu
                        mode="horizontal"
                        style={ {
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            border: "none"
                        } }
                    >
                        <Menu.Item style={ {
                            fontSize: '1.2rem'
                        } } key="1">Reasearch</Menu.Item>
                        <Menu.Item style={ {
                            fontSize: '1.2rem'
                        } } key="2">About</Menu.Item>
                    </Menu>
                </Col>
            </Row>
        )
    }
}


export default Top;