import React, {Component} from 'react';
import {Row, Col} from 'antd';
import GoogleMapPano from './GoogleMapPano';
import GoogleAutocompleteInput from "./GoogleAutocompleteInput";

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            lng: null
        };
    }

    onHandleGeoCodingChanged = (payload) => {
        this.setState({lat: payload.lat, lng: payload.lng}, () => {
            // console.log("Geocoding has been updated: ", this.state)
        })
    };

    render() {
        return (
            <div style={{
                minHeight: "85vh",
            }}
                 align='middle'
            >
                <Row>
                    <Col
                        xs={24}
                        sm={12}
                        style={{
                            fontSize: '3rem',
                            color: "white",
                            padding: 20,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        This is what climate change does.<br/>
                        What will your house look like in 2050?
                    </Col>
                    <Col>
                        <GoogleAutocompleteInput onHandleGeoCodingChanged={this.onHandleGeoCodingChanged}/>
                    </Col>
                </Row>
                <Row>
                    <GoogleMapPano lat={this.state.lat} lng={this.state.lng}/>
                </Row>
            </div>
        )
    }

}


export default Content;