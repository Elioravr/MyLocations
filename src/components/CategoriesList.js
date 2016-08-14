import _ from 'lodash';
import React, { Component } from 'react';
import { List } from 'material-ui/List';

import Category from './Category';
import EmptyList from './EmptyList';

import '../styles/categories-list.css';

export default class CategoriesList extends Component {

  renderCategories() {
    if (_(this.props.categories).isEmpty()) {
      return <EmptyList entityName="categories" />
    } else {
      return this.props.categories.map((category) => {
        return (
          <Category
            key={category.name}
            category={category}
            removeCategory={this.props.removeCategory}
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
