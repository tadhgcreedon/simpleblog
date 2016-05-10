import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return(
      <header>
        <h1><a href="#">Blogging App</a></h1>
        <span id="authorText">by Tadhg Creedon</span>
      </header>
    );
  }
}
