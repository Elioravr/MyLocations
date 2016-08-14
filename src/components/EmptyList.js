import React, { Component, PropTypes } from 'react';

import IconArrow from 'material-ui/svg-icons/navigation/arrow-upward';

import '../styles/empty-list.css';

export default class EmptyList extends Component {
  render() {
    this.iconStyle = {
      height: '40px',
      width: '40px',
      color: '#b3b3b3'
    };

    return (
      <div className="empty-view-container">
        <span>You have no {this.props.entityName} yet. Please add some.</span>
        <div className="arrow-container">
          <IconArrow style={this.iconStyle} />
        </div>
      </div>
    );
  }
}

EmptyList.propTypes = {
  entityName: PropTypes.string.isRequired
};
