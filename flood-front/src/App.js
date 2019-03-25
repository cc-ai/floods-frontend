import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />

        <Route exact path="/" component={ Home } />
      </Router>
    );
  }
}

export default App;
