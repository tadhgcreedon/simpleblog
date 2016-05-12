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
        <Post key={post._id} id={post._id} owner={post.owner} title={post.title} content={post.description} date={post.createdAt} />
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
    let date = this.props.date.toString();
    return(
      <div className="post">
        <pre>
        <strong className="postTitle">{this.props.title}</strong>&nbsp;|&nbsp;
        by <em>{this.props.owner}</em> at {date} <br/><br/>
        {this.props.content}
        </pre>
        {

          <ModifyPost postId={this.props.id} />
        }
      </div>
    );
  }
}

class ModifyPost extends Component {
  render(){
    return(
      <div id="modifyPostContainer">
        <button>E</button>
        <button>X</button>
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
