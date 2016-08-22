import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategory } from '../actions/categoriesActions';
import LocationsList from './LocationsList';
import '../styles/category-page.css';

export default class CategoryPage extends Component {
  componentWillMount() {
    this.categoryId = this.props.routeParams.categoryId;
    this.dispatchNewCategoty(this.props.routeParams.categoryId);
  }

  componentWillUpdate(newProps) {
    if (newProps.params.categoryId !== this.state.categoryId) {
      this.dispatchNewCategoty(newProps.params.categoryId);
    }
  }

  dispatchNewCategoty(categoryId) {
    this.setState({
      categoryId: categoryId
    });

    this.props.dispatch(fetchCategory(categoryId));
  }

  render() {
    return (
      <div className="content-container category-page-container">
        <header className="category-name">Locations for {this.props.category.name}</header>
        <LocationsList categoryId={this.state.categoryId} />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    category: store.categories.category,
  };
})(CategoryPage);
