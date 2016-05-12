import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import { Posts } from '../api/posts.js';

class Blog extends Component {
  noPosts() {
    if(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.params.owner === this.props.currentUser.username) {
      return(
        <p>Nothing here yet. Make <Link to="/newPost">your first post</Link>!</p>
      );
    }
    else {
      return(
        <p>User has no posts.</p>
      );
    }
  }

  showPosts(userPosts) {
    return userPosts.map((post) => {
      return (
        <Post key={post._id} post={post} />
      );
    });
  }

  render() {
    if(this.props.posts !== null) {
      userPosts = this.props.posts.filter(post => post.owner === this.props.params.owner);
      return(
        <section id="blogContainer" className="contentContainer">
          {
            userPosts.length < 1 || userPosts.length === undefined ?
            this.noPosts() :
            this.showPosts(userPosts)
          }
        </section>
      );
    }
    else {
      return(
        <section id="blogContainer" className="contentContainer">
          <p>Error retrieving posts.</p>
        </section>
      )
    }
  }
}

class Post extends Component {
  render() {
    let date = this.props.post.createdAt.toString();
    return(
      <div className="post">
        <pre>
        <strong className="postTitle">{this.props.post.title}</strong>&nbsp;|&nbsp;
        by <em>{this.props.post.owner}</em> at {date} <br/><br/>
        {this.props.content}
        </pre>
        {

          <ModifyPost post={this.props.post} />
        }
      </div>
    );
  }
}

class ModifyPost extends Component {
  deletePost(){
    console.log("Deleting task #" + this.props.post._id);
    Posts.remove(this.props.post._id);
  }
  render(){
    return(
      <div id="modifyPostContainer">
        <button>E</button>
        <button onClick={this.deletePost.bind(this)}>X</button>
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, Blog);
