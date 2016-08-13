import _ from 'lodash';
import React, { Component } from 'react';

import Category from './Category';
import EmptyList from './EmptyList';

export default class CategoriesList extends Component {
  renderCategories() {
    if (_(this.props.categories).isEmpty()) {
      return <EmptyList entityName="categories" />
    } else {
      return this.props.categories.map((category) => {
        return <Category key={category._id} category={category} />
      });
    }
  }

  render() {
    return (
      <div className="categories-list-container">
        {this.renderCategories()}
      </div>
    );
  }
}
