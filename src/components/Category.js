import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconStyle from 'material-ui/svg-icons/image/style';
import IconRemove from 'material-ui/svg-icons/content/clear';
import { Link } from 'react-router';

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

    const fullViewButton = (
      <Link to={`/categories/${this.props.category.id}`}>
        <IconButton
          style={{ padding: 0, width: "24px", height: "24px" }}
        >
          <IconStyle className="full-button"/>
        </IconButton>
      </Link>
    );

    return(
      <ListItem
        className="category"
        primaryText={this.props.category.name}
        leftIcon={fullViewButton}
        rightIcon={removeButton} />
    );
  }
}
