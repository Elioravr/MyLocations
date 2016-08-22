import _ from 'lodash';
import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import { fetchLocations, removeLocation } from '../actions/locationsActions';
import { fetchCategories } from '../actions/categoriesActions';
import Location from './Location';
import EmptyList from './EmptyList';

import '../styles/locations-list.css';

class LocationsList extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
    this.dispatchLocationsForNewCategoty(this.props.categoryId);
  }

  componentWillUpdate(newProps) {
    if (this.state && newProps.categoryId !== this.state.categoryId) {
      this.dispatchLocationsForNewCategoty(newProps.categoryId);
    }
  }

  dispatchLocationsForNewCategoty(categoryId) {
    this.setState({
      categoryId: categoryId
    });

    this.props.dispatch(fetchLocations(categoryId));
  }

  removeLocation(locationId) {
    let response = this.props.dispatch(removeLocation(locationId));

    if (!response.error) {
      this.props.showAlert("Location removed!");
    }
  }

  renderLocations() {
    if (_(this.props.locations).isEmpty()) {
      return <EmptyList entityName="locations" />
    } else {
      return this.props.locations.map((location) => {
        let categories = this.getCategories(location);

        return <Location
          key={location.id}
          location={location}
          categories={categories}
          removeLocation={this.removeLocation.bind(this, location.id)}
        />
      });
    }
  }

  getCategories(location) {
    return this.props.categories.filter((category) => {
      return _(location.categoriesIds).includes(category.id);
    });
  }

  getListClass() {
    return `${this.props.categoryId ? "" : "content-container"} locations-list-container`;
  }

  render() {
    return (
      <List className={this.getListClass()}>
        {this.renderLocations()}
      </List>
    );
  }
}

export default connect((store) => {
  return {
    locations: store.locations.locations,
    categories: store.categories.categories
  };
})(LocationsList);
