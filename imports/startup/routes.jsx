import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../ui/App.jsx';
import Explore from '../ui/Explore.jsx';
import Blog from '../ui/Blog.jsx';
import NewPost from '../ui/NewPost.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Explore} />
      <Route path="/blog" component={Blog} />
      <Route path="/newPost" component={NewPost} />
    </Route>
  </Router>
);
