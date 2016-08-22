import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconStyle from 'material-ui/svg-icons/image/style';
import { Link } from 'react-router';

export default class CategoryChip extends Component {
  render() {
    const style = {
      float: "left",
      margin: "5px",
      cursor: "pointer"
    };

    return (
      <Link to={`/categories/${this.props.category.id}`}>
        <Chip className="category-chip" style={style}>
          <Avatar color="#444" icon={<IconStyle />} />
          {this.props.category.name}
        </Chip>
      </Link>
    );
  }
}
