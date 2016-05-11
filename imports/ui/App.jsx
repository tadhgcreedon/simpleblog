import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// Import UI components
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Explore from './Explore.jsx';
import Footer from './Footer.jsx';

//Import DB Collections
import { Posts } from '../api/posts.js';

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
          {this.props.children}
            <br />
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    posts: Posts.find({}).fetch(),
  };
}, App);
