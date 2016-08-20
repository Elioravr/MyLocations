import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconStyle from 'material-ui/svg-icons/image/style';
import IconRemove from 'material-ui/svg-icons/content/clear';

export default class Category extends Component {
  onRemoveClicked() {
    this.props.removeCategory();
  }

  render() {
    const removeButton = (
      <IconButton
        style={{ padding: 0 }}
        onTouchTap={this.onRemoveClicked.bind(this)}
      >
        <IconRemove className="remove-button"/>
      </IconButton>
    );

    return(
      <ListItem
        className="category"
        primaryText={this.props.category.name}
        leftIcon={<IconStyle />}
        rightIcon={removeButton} />
    );
  }
}
