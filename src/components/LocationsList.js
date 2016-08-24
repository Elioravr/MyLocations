import _ from 'lodash';
import React, { Component } from 'react';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';

import { fetchLocations, sortLocations, removeLocation } from '../actions/locationsActions';
import { fetchCategories } from '../actions/categoriesActions';
import Location from './Location';
import EmptyList from './EmptyList';
import SortButton from './SortButton';

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

  sortLocations() {
    this.props.dispatch(sortLocations("name"));
  }

  renderLocations() {
    if (this.isLocationsEmpty()) {
      return <EmptyList entityName="locations" />
    } else {
      return this.props.locations.map((location) => {
        let categories = this.getCategories(location);

        return (
          <Location
            key={location.id}
            location={location}
            categories={categories}
            editLocation={this.props.editLocation}
            removeLocation={this.removeLocation.bind(this, location.id)}
          />
        );
      });
    }
  }

  renderSortButton() {
    if (!this.isLocationsEmpty()) {
      return <SortButton onSortClicked={this.sortLocations.bind(this)} />;
    }
  }

  getCategories(location) {
    return this.props.categories.filter((category) => {
      return _.includes(location.categoriesIds, category.id);
    });
  }

  getListClass() {
    return `${this.props.categoryId ? "" : "content-container"} locations-list-container`;
  }

  isLocationsEmpty() {
    return _.isEmpty(this.props.locations);
  }

  render() {
    return (
      <List className={this.getListClass()}>
        {this.renderLocations()}
        {this.renderSortButton()}
      </List>
    );
  }
}

export default connect((store) => {
  let { locations, sorting } = store.locations;

  if (sorting) {
    locations = _.sortBy(locations, sorting);
  }

  return {
    locations: locations,
    categories: store.categories.categories
  };
})(LocationsList);
