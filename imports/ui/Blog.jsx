import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import { Posts } from '../api/posts.js';

class Blog extends Component {
  noPosts() {
    if(this.props.currentUser !== null && this.props.currentUser !== undefined && this.props.params.owner === this.props.currentUser.username) {
      return(
        <p>Nothing here yet. Make <Link to="/newPost" className="firstPostLink">your first post</Link>!</p>
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
  constructor(props) {
    super(props);

    this.state = {
      postEditable: false,
    };
  }
  editPost() {
    if(this.state.postEditable === true){

      const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
      const description = ReactDOM.findDOMNode(this.refs.description).value.trim();

      // check if text has changed
      if(title !== this.props.post.title || description !== this.props.post.description) {
        if(title === "" || description === "") {
          alert("Fields cannot be empty.");
          return;
        }
        console.log("updating");
        Posts.update(this.props.post._id, {
          $set: { title: title, description: description, createdAt: new Date(), },
        });
      }

    }
    this.setState({
      postEditable: !this.state.postEditable,
    });
  }
  render() {
    let date = this.props.post.createdAt.toString();
    const editableClassName = this.state.postEditable ? "contentEditable " : "";

    return(
      <div className="post">
        <pre>
        <input ref="title" className={editableClassName + "postTitle"} defaultValue={this.props.post.title}
        disabled={!this.state.postEditable} />

        &nbsp;|&nbsp;

        by <em>{this.props.post.owner}</em> at {date} <br/><br/><hr/>

        <textarea className={editableClassName + "postDescription"} ref="description" defaultValue={this.props.post.description} disabled={!this.state.postEditable} />
        </pre>
        {
          <ModifyPost post={this.props.post} editPostHandler={this.editPost.bind(this)}/>
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
  editPost() {
    this.props.editPostHandler();
  }
  render(){
    return(
      <div id="modifyPostContainer">
        <button onClick={this.editPost.bind(this)}>E</button>
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
