import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CategoryChip from './CategoryChip';

export default class Location extends Component {
  renderCategories() {
    return this.props.categories.map((category) => {
      return (
        <CategoryChip
          key={category.id}
          category={category}
        />
      );
    });
  }

  render() {
    return (
      <Card className="location-container">
        <CardMedia
          overlay={<CardTitle title={this.props.location.name}/>}
        >
          <img
            role="presentation"
            src="http://assets.barcroftmedia.com.s3-website-eu-west-1.amazonaws.com/assets/images/recent-images-11.jpg" />
        </CardMedia>
        <CardText>
          {this.renderCategories()}
        </CardText>
        <CardActions style={{"clear": "both"}}>
          <FlatButton label="Edit" />
          <FlatButton label="Remove" onTouchTap={this.props.removeLocation} />
        </CardActions>
      </Card>
    );
  }
}
