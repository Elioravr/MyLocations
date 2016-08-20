import _ from 'lodash';
import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import { fetchCategories, removeCategory } from '../actions/categoriesActions';
import Category from './Category';
import EmptyList from './EmptyList';

import '../styles/categories-list.css';

class CategoriesList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  removeCategory(categoryId) {
    let response = this.props.dispatch(removeCategory(categoryId));

    if (!response.error) {
      this.props.showAlert("Category removed!");
    }
  }

  renderCategories() {
    if (_(this.props.categories).isEmpty()) {
      return <EmptyList entityName="categories" />
    } else {
      return this.props.categories.map((category) => {
        return (
          <Category
            key={category.id}
            category={category}
            removeCategory={this.removeCategory.bind(this, category.id)}
          />
        );
      });
    }
  }

  render() {
    return (
      <List className="categories-list-container">
        {this.renderCategories()}
      </List>
    );
  }
}

export default connect((store) => {
  return {
    categories: store.categories.categories
  };
})(CategoriesList);
