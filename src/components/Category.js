import React, { Component } from 'react';

export default class Category extends Component {
  render() {
    return(
      <div className="category">
        <span className="category-name">{this.props.category.name}</span>
      </div>
    );
  }
}
