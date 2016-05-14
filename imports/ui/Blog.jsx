import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import { Posts } from '../api/posts.js';
import '../api/users.js';

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
        <Post key={post._id} post={post}/>
      );
    });
  }

  render() {
    const blogOwner = Meteor.users.findOne({username: this.props.params.owner});
    if(this.props.posts !== null && blogOwner !== undefined) {
      userPosts = this.props.posts.filter(post => post.owner === blogOwner._id);
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
        Meteor.call('posts.update', this.props.post._id, title, description);
      }

    }
    this.setState({
      postEditable: !this.state.postEditable,
    });
  }
  render() {
    const blogOwnerName = Meteor.users.findOne(this.props.post.owner).username;
    const date = this.props.post.dateTime.toDateString();
    const time = this.props.post.dateTime.toLocaleTimeString();
    const editableClassName = this.state.postEditable ? "contentEditable " : "";
    return(
      <div className="post">
        <pre>
        <input ref="title" className={editableClassName + "postTitle"} defaultValue={this.props.post.title}
        maxLength="50" disabled={!this.state.postEditable}
        size={this.state.postEditable ? "50" : this.props.post.title.length} />

        <span class="postAuthorText">
        {this.state.postEditable ? <span>&nbsp;</span> : null}
        <span className="postTitleDivider">| by </span><br className="postTitleLineBreak"/>
         <em>{blogOwnerName}</em> on {date} at {time}<br/><br/><hr/>
         </span>

        <textarea className={editableClassName + "postDescription"} ref="description" defaultValue={this.props.post.description} disabled={!this.state.postEditable}
        rows={this.state.postEditable ? "15" : ""} maxLength="1500" />
        </pre>
        {
          Meteor.userId() === this.props.post.owner ?
          <ModifyPost post={this.props.post} postEditable={this.state.postEditable} editPostHandler={this.editPost.bind(this)}/> : null
        }
      </div>
    );

  }
}

class ModifyPost extends Component {
  deletePost(){
    Meteor.call("posts.remove", this.props.post._id);
  }
  editPost() {
    this.props.editPostHandler();
  }
  render(){
    return(
      <div id="modifyPostContainer">
        <button onClick={this.editPost.bind(this)}>{this.props.postEditable ? <span>&#10003;</span> : <span>E</span>}</button>
        <button onClick={this.deletePost.bind(this)}>X</button>
      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('posts');
  Meteor.subscribe('users');

  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    posts: Posts.find({}, { sort: { dateTime: -1 } }).fetch(),
  };
}, Blog);
