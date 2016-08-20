import React from 'react';

import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store';
import App from './components/App';
import CategoriesList from './components/CategoriesList';
import LocationsList from './components/LocationsList';

const history = syncHistoryWithStore(browserHistory, store);

export const renderRoutes = () => (
  <Router history={history}>
    <Route component={App}>
      <Route path="categories" component={CategoriesList} />
      <Route path="locations" component={LocationsList} />
    </Route>
    <Redirect from="/" to="categories" />
  </Router>
);
