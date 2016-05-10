import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return(
      <div>
        <h1>Blogging App</h1>
        <span className="authorText">by Tadhg Creedon</span>
        <br /><br />
        <hr />
      </div>
    );
  }
}
