import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconSort from 'material-ui/svg-icons/av/sort-by-alpha';

export default class SortButton extends Component {
  render() {
    const style = {
      marginRight: 20,
      position: "fixed",
      right: 0,
      bottom: "80px",
    };

    return (
      <FloatingActionButton
        secondary={true}
        style={style}
        onTouchTap={this.props.onSortClicked}
      >
        <IconSort />
      </FloatingActionButton>
    );
  }
}
