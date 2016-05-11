import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NewPost extends Component {
  render() {
    return(
      <section style={temporaryTextStyle}>
        New Post form.
      </section>
    );
  }
}

var temporaryTextStyle = {color: "white", padding: "5px"};
