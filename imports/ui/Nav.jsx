import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { IndexLink, Link } from 'react-router';

// Links to Explore all blogs, Current user's blog posts and new post form
export default class Nav extends Component {
  render() {
    return(
      <section id="navLinksContainer">
        <IndexLink className="navLink" activeClassName="navLinkCurrent" to="/"><h3>Explore</h3></IndexLink> |&nbsp;
        <Link className="navLink" activeClassName="navLinkCurrent" to={"/blog/" + Meteor.user().username}><h3>My Blog</h3></Link> |&nbsp;
        <Link className="navLink" activeClassName="navLinkCurrent" to="/newPost"><h3>New Post</h3></Link>
        <br /><br />
      </section>
    );
  }
}
