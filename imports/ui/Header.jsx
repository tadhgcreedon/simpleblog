import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Header extends Component {
  render() {
    return(
      <header>
        <h1><a href="/">Blogging App</a></h1>
        <span id="authorText">by Tadhg Creedon</span>
        <Login />
      </header>
    );
  }
}

class Login extends Component {
  render(){
    return(
      <span id="loginContainer">
        <AccountsUIWrapper />
      </span>
    );
  }
}
