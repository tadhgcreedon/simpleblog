import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Router, Link } from 'react-router';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Posts } from '../api/posts.js';

class NewPost extends Component {
  handleSubmit(event) {
    event.preventDefault();
    const owner = this.props.currentUser.username
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

    Posts.insert({
      owner: owner, //owner
      title: title, //title
      description: description, //content
      createdAt: new Date(), //current time
    });
    // Router.browserHistory.push('/');
  }
  render() {
    if(this.props.currentUser !== null && this.props.currentUser !== undefined){
      return(
        <section id="newPostContainer" className="contentContainer">
          <form method="post" action={"/blog/" + this.props.currentUser.username} onSubmit={this.handleSubmit.bind(this)}>
            <input ref="title" required type="text" maxLength="100" placeholder="Title" name="titleInput" />
            <br />
            <textarea ref="description" required rows="15" maxLength="1500" placeholder="Content" name="descriptionInput" />
            <br />
            <button type="submit"><Link className="submitPostLink" to={"/blog/" + this.props.currentUser.username}>Post</Link></button>
          </form>
        </section>
      );
    }
    else {
      return(
        <section id="newPostContainer" className="contentContainer">
        </section>
      );
    }
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, NewPost);
