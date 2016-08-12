import React, { Component } from 'react';

import Category from './Category';

export default class CategoriesList extends Component {
  renderCategories() {
    return this.props.categories.map((category) => {
      return <Category key={category._id} category={category} />
    });
  }

  render() {
    return (
      <div className="categories-list-container">
        {this.renderCategories()}
      </div>
    );
  }
}
