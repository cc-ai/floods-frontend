import React, {Component} from 'react';
import {Col} from 'antd';
import {Input} from 'antd';
import Script from 'react-load-script';

class Right extends Component {

    state = {
        data: [],
        value: undefined,
        loading: false
    }

    handleChange = (ev) => {
        const value = ev.target.value;
        this.setState({
            value
        })
    }

    // handleChange = (value) => {
    //     this.setState({ value });
    // }

    handleScriptLoad = () => {

        // Declare Options For Autocomplete 
        var options = {types: ["address"]};

        // Initialize Google Autocomplete 
        /*global google*/
        this.autocomplete = new google.maps.places.Autocomplete(
            document.getElementById("autocomplete"),
            options);
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener("place_changed",
            this.handlePlaceSelect);
    }

    handlePlaceSelect = () => {

        // Extract City From Address Object
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;

        // Check if address is valid
        if (address) {
            // Set State
            console.log(addressObject.formatted_address);
            this.setState(
                {
                    value: addressObject.formatted_address,
                }
            );
        }
    }

    render() {
        const scriptURL = "https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&libraries=places";

        return <Col
            xs={24}
            sm={12}
            style={{
                fontSize: '3rem',
                color: "white",
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Script async defer
                url={scriptURL}
                onLoad={this.handleScriptLoad}
            />
            <Input
                style={{width: '75%'}}
                size="large"
                id="autocomplete"
                onChange={this.handleChange}
                value={this.state.value}
                allowClear
            ></Input>
        </Col>
    }

}


export default Right;