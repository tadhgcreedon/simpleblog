import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export default class NewPost extends Component {
  render() {
    return(
      <section id="newPostContainer" className="contentContainer">
        <form method="post" action="/blog">
          <label for="titleInput">
            Title<br />
            <input required type="text" maxLength="100" name="titleInput" />
          </label>
          <br />
          <label for="descriptionInput">
            Content<br />
            <textarea required rows="15" maxLength="1500" name="descriptionInput" />
          </label>
          <br />
          <button type="submit">Post</button>
        </form>
      </section>
    );
  }
}
