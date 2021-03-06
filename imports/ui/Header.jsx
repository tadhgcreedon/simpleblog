import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Header extends Component {
  render() {
    return(
      <header>
        <h1><a href="/"><span id="titleWordSimple">simple</span><span id="titleWordBlog">blog</span></a></h1>
        <span id="authorText">by <a href="http://www.tadhgcreedon.com">Tadhg Creedon</a></span>
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
