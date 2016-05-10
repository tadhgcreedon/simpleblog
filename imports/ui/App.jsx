import React, { Component } from 'react';

// Import UI components
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Explore from './Explore.jsx';
import Footer from './Footer.jsx';

export default class App extends Component {
  render() {
    return(
      <div>
        {/*Enclosing div is required by React to render components*/}
        <Header />
        <div id="contentContainer">
            <br />
          <Nav />
            <br />
          <Explore />
            <br />
        </div>
        <Footer />
      </div>
    );
  }
}
