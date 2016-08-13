import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';
import CategoriesList from './CategoriesList';
import MyLocationsAppBar from './MyLocationsAppBar';
import MyLocationsFooter from './MyLocationsFooter';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    return (
      <div className='App'>
        <MyLocationsAppBar />
        <div className="main-container">
          <CategoriesList categories={this.props.categories} />
        </div>
        <MyLocationsFooter />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    categories: store.categories.categories
  };
})(App);
