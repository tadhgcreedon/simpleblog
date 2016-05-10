import React, { Component } from 'react';

// Import UI components
import Header from './Header.jsx';
import Nav from './Nav.jsx';

export default class App extends Component {
  render() {
    return(
      <div>
        {/*Enclosing div is required by React to render components*/}
        <Header />
        <Nav />
      </div>
    );
  }
}
