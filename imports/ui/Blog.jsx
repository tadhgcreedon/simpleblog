import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Posts } from '../api/posts.js';

export default class Blog extends Component {
  render() {
    return(
      <section id="blogContainer" className="contentContainer" style={temporaryTextStyle}>
        {
          this.props.posts.count < 1 || this.props.posts.count === undefined ?
          <p>User has no posts.</p> :
          <p>User has posts</p>
        }
      </section>
    );
  }
}

var temporaryTextStyle = {color: "white", padding: "5px"};

export default createContainer(() => {
  return {
    posts: Posts.find({}).fetch(),
  };
}, Blog);
