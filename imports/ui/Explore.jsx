import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

// List of available blogs to view
class Explore extends Component {
  render() {
    return(
      <section id="exploreContainer" className="contentContainer">
        <p id="exploreContainerHeaderText">Check Out Blogs By: </p>
        <ul>
          <li><a href="/blog">Example User 1</a></li>
          <li><a href="/blog">Example User 2</a></li>
          <li><a href="/blog">Example User 3</a></li>
          <li><a href="/blog">Example User 4</a></li>
          <li><a href="/blog">Example User 5</a></li>
        </ul>
        {
          this.props.currentUser ?
          null : <div><hr /><span id="createYourOwnBlogText">Or create an account and make your own!</span></div>
        }
      </section>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Explore);
