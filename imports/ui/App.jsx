import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Import UI components
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Explore from './Explore.jsx';
import Footer from './Footer.jsx';

class App extends Component {
  render() {
    return(
      <div>
        {/*Enclosing div is required by React to render components*/}
        <Header />
        <div id="contentContainer">
          <br />
          {
            this.props.currentUser ?
            <Nav /> : null
          }
          <br />
          <Explore />
            <br />
        </div>
        <Footer />
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);
