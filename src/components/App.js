import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions/categoriesActions';
import CategoriesList from './CategoriesList';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    return (
      <div className='App'>
        <CategoriesList categories={this.props.categories} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    categories: store.categories.categories
  };
})(App);
