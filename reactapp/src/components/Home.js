import React, {Component} from 'react';
import Top from './Top';
import Content from './content/Content';
import Footer from './Footer'

// import Footer from './Footer';

class Home extends Component {
    render() {
        return <div
            style={{
                height: "100%",
                zIndex: 3,
                backgroundColor: "#8E398E"
            }}
        >
            <Top/>
            <Content/>
            <Footer/>
        </div>
    }
}

export default Home;