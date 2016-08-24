import React, { Component } from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CategoryChip from './CategoryChip';

export default class Location extends Component {
  generateSrc() {
    return `http://loremflickr.com/${window.innerWidth}/300/paris?random=${this.props.location.id}`
  }

  onEditLocationClicked() {
    this.props.editLocation({
      location: this.props.location
    });
  }

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
          overlay={<CardTitle title={this.props.location.name} subtitle={this.props.location.address} />}
        >
          <img
            role="presentation"
            src={this.generateSrc()} />
        </CardMedia>
        <CardText>
          {this.renderCategories()}
        </CardText>
        <CardActions style={{"clear": "both"}}>
          <FlatButton label="Edit" onTouchTap={this.onEditLocationClicked.bind(this)} />
          <FlatButton label="Remove" onTouchTap={this.props.removeLocation} />
        </CardActions>
      </Card>
    );
  }
}
