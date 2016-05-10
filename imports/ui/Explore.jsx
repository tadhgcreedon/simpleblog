import React, { Component } from 'react';

// List of available blogs to view
export default class Explore extends Component {
  render() {
    return(
      <section id="exploreContainer">
        <p id="exploreContainerHeaderText">Check Out Blogs By: </p>
        <ul>
          <li><a href="#">Example User 1</a></li>
          <li><a href="#">Example User 2</a></li>
          <li><a href="#">Example User 3</a></li>
          <li><a href="#">Example User 4</a></li>
          <li><a href="#">Example User 5</a></li>
        </ul>
      </section>
    );
  }
}
