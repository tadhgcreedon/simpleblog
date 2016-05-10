import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return(
      <header>
        <h1>Blogging App</h1>
        <span id="authorText">by Tadhg Creedon</span>
      </header>
    );
  }
}
