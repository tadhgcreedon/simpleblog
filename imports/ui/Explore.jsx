import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

// List of available blogs to view
class Explore extends Component {
  listUserBlogs(){
    return this.props.users.map((user) => {
      return (
        <UserBlogLink key={user._id} userName={user.username} />
      );
    });
  }

  render() {
    return(
      <section id="exploreContainer" className="contentContainer">
        <p id="exploreContainerHeaderText">Check Out Blogs By: </p>

        <ul>
          {this.listUserBlogs()}
        </ul>

        {
          this.props.currentUser ?
          null : <div><hr /><span id="createYourOwnBlogText">Or create an account and make your own!</span></div>
        }

      </section>
    );
  }
}

class UserBlogLink extends Component {
  render() {
    return(
      <li>
        <Link to={"blog/" + this.props.userName}>{this.props.userName}</Link>
      </li>
    );
  }
}

Explore.propTypes = {
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
    users: Meteor.users.find({}).fetch(),
  };
}, Explore);
