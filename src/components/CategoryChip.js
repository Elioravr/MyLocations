import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconStyle from 'material-ui/svg-icons/image/style';

export default class CategoryChip extends Component {
  render() {
    let style = {
      float: "left",
      margin: "5px",
    };

    return (
      <Chip className="category-chip" style={style}>
        <Avatar color="#444" icon={<IconStyle />} />
        {this.props.category.name}
      </Chip>
    );
  }
}
