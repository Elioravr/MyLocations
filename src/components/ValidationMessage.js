import React, { Component } from 'react';
import IconRemove from 'material-ui/svg-icons/content/clear';

import '../styles/validation-message.css';

export default class ValidationMessage extends Component {
  componentWillMount() {
    let message = this.props.message;
    this.defaultMessage = "Please enter all fields";

    if (!message) {
      message = this.defaultMessage;
    }

    this.setState({
      message,
      isVisible: false
    });
  }

  show(message) {
    this.setState({
      isVisible: true,
      message: message ? message : this.defaultMessage
    });
  }

  hide() {
    this.setState({
      isVisible: false
    });
  }

  render() {
    const iconStyle = {
      float: "right"
    }

    if (this.state.isVisible === true) {
      return (
        <div className="validation-message">
          {this.state.message}
          <IconRemove style={iconStyle} onTouchTap={this.hide.bind(this)} />
        </div>
      );
    }
    else {
      return null;
    }
  }
}
