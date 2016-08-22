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

  handleOpen() {
    this.setState({newCategoryDialogOpen: true});
  }

  handleClose() {
    this.setState({newCategoryDialogOpen: false});
  }

  handleSubmit() {
    let categoryName = this.serializeCategory();

    if (categoryName !== "") {
      this.props.onSubmit(categoryName);
    }
    else {
      this.showValidationMessage();
    }
  }

  serializeCategory() {
    return this.refs.nameInput.getValue();
  }

  showValidationMessage(message) {
    this.refs.validationMessage.show(message);
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
            floatingLabelText="What's the name of the category?"
          />
        </div>
      </Dialog>
    );
  }
}
