import React, { Component } from 'react';

// Links to Explore all blogs, Current user's blog posts and new post form
export default class Nav extends Component {
  render() {
    return(
      <div>
        <a className="navLink navLinkCurrent" href="#"><h3>Explore</h3></a> |&nbsp;
        <a className="navLink" href="#"><h3>My Blog</h3></a> |&nbsp;
        <a className="navLink" href="#"><h3>New Post</h3></a>
      </div>
    );
  }
}
