import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import ValidationMessage from './ValidationMessage';

export default class NewCategoryDialog extends Component {
  componentWillMount() {
    this.setState({
      newCategoryDialogOpen: false,
    });
  }

  handleOpen(options = {}) {
    let newState = {
      newCategoryDialogOpen: true
    };

    if (options.category) {
      newState.category = options.category
    }

    this.setState(newState);
  }

  handleClose() {
    this.setState({newCategoryDialogOpen: false});
  }

  handleSubmit() {
    let name = this.serializeCategory();

    if (name === "") {
      this.showValidationMessage();
    }
    else if (!this.state.category) {
      this.props.onSubmit({ name });
      this.clearStateCategory();
    }
    else {
      let category = this.state.category;
      category.name = name;

      this.clearStateCategory();
      this.props.onSubmit(category);
    }
  }

  serializeCategory() {
    return this.refs.nameInput.getValue();
  }

  showValidationMessage(message) {
    this.refs.validationMessage.show(message);
  }

  clearStateCategory() {
    this.setState({
      category: null
    });
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
        title="Create new category"
        className="new-category-dialog"
        actions={actions}
        modal={false}
        open={this.state.newCategoryDialogOpen}
        onRequestClose={this.handleClose.bind(this)}
      >
        <ValidationMessage ref="validationMessage" />
        <div className="category-name-container">
          <TextField
            ref="nameInput"
            hintText="Enter category name"
            defaultValue={this.state.category ? this.state.category.name : ""}
            floatingLabelText="What's the name of the category?"
          />
        </div>
      </Dialog>
    );
  }
}
