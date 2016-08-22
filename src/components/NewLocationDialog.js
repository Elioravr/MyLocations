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

  handleOpen() {
    this.setState({newLocationDialogOpen: true});
  }

  handleClose() {
    this.setState({newLocationDialogOpen: false});
  }

  handleSubmit() {
    let newLocation = this.serializeLocation();

    if (newLocation) {
      this.props.onSubmit(newLocation);
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

    return newLocation;
  }

  getSelectedCategories() {
    return this.categoriesSelect.props.value.map((category) => {
      return category.value;
    });
  }

  showValidationMessage(message) {
    this.refs.validationMessage.show(message);
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
        label="Create"
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
            floatingLabelText="What's the name of the location?"
          />
        </div>
        <div className="location-categories-container">
          <CategoriesAutoComplete
            selectRef={this.setCategoriesSelectRef.bind(this)} />
        </div>
      </Dialog>
    );
  }
}
