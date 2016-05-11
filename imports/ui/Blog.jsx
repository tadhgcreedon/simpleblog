import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class Blog extends Component {
  render() {
    return(
      <section style={temporaryTextStyle}>
        Blog goes here.
      </section>
    );
  }
}

var temporaryTextStyle = {color: "white", padding: "5px"};
