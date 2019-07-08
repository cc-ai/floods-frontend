import Script from "react-load-script";
import React from "react";
import Grid from '@material-ui/core/Grid'


class GoogleMapPano extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: props.lat,
            lng: props.lng
        };
        this.initialize = this.initialize.bind(this)
    }

    initialize = () => {
        let fenway = {lat: this.state.lat, lng: this.state.lng};
        const google = window.google;
        let map = new google.maps.Map(document.getElementById('map'), {
            center: fenway,
            zoom: 14
        });
        let panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
                position: fenway,
                pov: {
                    heading: 34,
                    pitch: 10
                }
            });
        map.setStreetView(panorama);
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.lat !== nextProps.lat ||
            this.state.lng !== nextProps.lng)
            this.setState({
                lat: nextProps.lat,
                lng: nextProps.lng

            }, () => {
                this.initialize()
            });
    }

    render = () => {
        const {lat, lng} = this.props;

        return (
            (!lat || !lng) ? <div style={{height: '50vh'}}/> :
                <div style={{height: '100%'}}>
                    <Script async defer
                            url={"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLE_API_KEY + "&libraries=places"}
                            onLoad={this.initialize}

                    >
                    </Script>
                    <Grid container justify='center' style={{height: "60vh"}}>
                        <Grid item xs={5}>
                            <div id="map" style={{position: 'fixed', height: '100%', width: '100%'}}/>
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={5}>
                            <div id="pano" style={{position: 'fixed', height: '100%', width: '100%'}}/>
                        </Grid>
                    </Grid>
                </div>
        )
    }
}

export default GoogleMapPano;