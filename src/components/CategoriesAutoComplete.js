import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select'
import 'react-select/dist/react-select.css';

import { fetchCategories } from '../actions/categoriesActions';

class CategoriesAutoComplete extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());

    this.setState({
      dataSource: this.getCategoriesNames(),
    });
  }

  getCategoriesNames() {
    return this.props.categories.map((category) => {
      return category.name;
    })
  }

  getCategoriesSelect() {
    return this.props.categories.map((category) => {
      return { value: category.id, label: category.name };
    })
  }

  onCategoriesSelected(values) {
    this.setState({
      selectedCategories: values
    });
  }

  getSelectedCategories() {
    return this.state.selectedCategories;
  }

  render() {
    return (
      <div>
        <Select
          ref={this.props.selectRef}
          placeholder="Choose category(ies)"
          value={this.state.selectedCategories}
          options={this.getCategoriesSelect()}
          multi={true}
          onChange={this.onCategoriesSelected.bind(this)}
        />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    categories: store.categories.categories
  };
})(CategoriesAutoComplete);
