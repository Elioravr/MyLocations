import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class NewCategoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategoryDialogOpen: false,
    };
  }

  handleOpen() {
    this.setState({newCategoryDialogOpen: true});
  }

  handleClose() {
    this.setState({newCategoryDialogOpen: false});
  }

  handleSubmit() {
    let categoryName = this.refs.nameInput.getValue();
    this.props.onSubmit(categoryName);
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
