import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import { Posts } from '../api/posts.js';

class Blog extends Component {
  noPosts() {
    if(this.props.params.owner === this.props.currentUser.username) {
      return(
        <p>Nothing here yet. Make <Link to="/newPost">your first</Link>!</p>
      );
    }
    else {
      return(
        <p>User has no posts.</p>
      );
    }
  }

  showPosts() {
    return this.props.posts.map((post) => {
      return (
        <Post key={post._id} owner={post.owner} title={post.title} content={post.description} date={post.createdAt} />
      );
    });
  }

  render() {
    return(
      <section id="blogContainer" className="contentContainer">
        {
          this.props.numberOfPosts < 1 || this.props.numberOfPosts === undefined ?
          this.noPosts() :
          this.showPosts()
        }
      </section>
    );
  }
}

class Post extends Component {

  render() {
    let date = this.props.date.toString();
    return(
      <div className="post">
        <pre>
        <strong className="postTitle">{this.props.title}</strong>&nbsp;|&nbsp;
        by <em>{this.props.owner}</em> at {date} <br/><br/>
        {this.props.content}
        </pre>
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  numberOfPosts: PropTypes.number.isRequired,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    posts: Posts.find({owner: Meteor.user().username }).fetch(),
    numberOfPosts: Posts.find({owner: Meteor.user().username }).count(),
  };
}, Blog);
