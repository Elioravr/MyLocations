import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ValidationMessage from './ValidationMessage';
import CategoriesAutoComplete from './CategoriesAutoComplete';

export default class NewLocationDialog extends Component {
  componentWillMount() {
    this.setState({
      newLocationDialogOpen: false,
    });
  }

  handleOpen(options = {}) {
    let newState = {
      newLocationDialogOpen: true
    };

    if (options.location) {
      newState.location = options.location
    }

    this.setState(newState);
  }

  handleClose() {
    this.clearStateLocation();
    this.setState({newLocationDialogOpen: false});
  }

  handleSubmit() {
    let newLocation = this.serializeLocation();

    if (newLocation) {
      this.props.onSubmit(newLocation);
      this.clearStateLocation();
    }
    else {
      this.showValidationMessage()
    }
  }

  serializeLocation() {
    let newLocation = {};

    newLocation.name = this.refs.nameInput.getValue();
    if (newLocation.name === "") {
      return false;
    }

    newLocation.categoriesIds = this.getSelectedCategories();
    if (newLocation.categoriesIds.length === 0) {
      return false;
    }

    if (this.state.location) {
      newLocation.id = this.state.location.id;
    }

    return newLocation;
  }

  getSelectedCategories() {
    return this.categoriesSelect.props.value.map((category) => {
      return category.value ? category.value : category;
    });
  }

  showValidationMessage(message) {
    this.refs.validationMessage.show(message);
  }

  clearStateLocation() {
    this.setState({
      location: null
    });
  }

  setCategoriesSelectRef(categoriesSelect) {
    this.categoriesSelect = categoriesSelect;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label={this.state.location ? "Edit" : "Create"}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    return (
      <Dialog
        title="Create new location"
        className="new-location-dialog"
        actions={actions}
        modal={false}
        open={this.state.newLocationDialogOpen}
        onRequestClose={this.handleClose.bind(this)}
        contentClassName="dialog-content"
      >
        <ValidationMessage ref="validationMessage" />
        <div className="location-name-container">
          <TextField
            ref="nameInput"
            hintText="Enter location name"
            defaultValue={this.state.location ? this.state.location.name : ""}
            floatingLabelText="What's the name of the location?"
          />
        </div>
        <div className="location-categories-container">
          <CategoriesAutoComplete
            selectRef={this.setCategoriesSelectRef.bind(this)}
            defaultValue={this.state.location ? this.state.location.categoriesIds : []}
          />
        </div>
      </Dialog>
    );
  }
}
