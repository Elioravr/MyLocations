import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
    let newLocation = {
      name: this.refs.nameInput.getValue(),
      categoriesIds: this.getSelectedCategories()
    };

    this.props.onSubmit(newLocation);
  }

  getSelectedCategories() {
    return this.categoriesSelect.props.value.map((category) => {
      return category.value;
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
