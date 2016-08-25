import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import '../styles/about-dialog.css'

export default class AboutDialog extends Component {
  componentWillMount() {
    this.setState({
      aboutDialogOpen: false,
    });
  }

  handleOpen() {
    this.setState({
      aboutDialogOpen: true,
    });
  }

  handleClose() {
    this.setState({
      aboutDialogOpen: false
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    return (
      <Dialog
        title="About MyLocations"
        className="about-dialog"
        actions={actions}
        modal={false}
        open={this.state.aboutDialogOpen}
        onRequestClose={this.handleClose.bind(this)}
      >
        <div className="about-container">
          <section className="description">
            <div>
              This project was created as a homework project
               for <a href="http://powtoon.com">Powtoon</a>, in order to plug into the awesomeness.
            </div>
            <div className="sammary">
              © Created By <a href="http://elioravr.com">Elior Avramoviz</a>.
            </div>
          </section>
          <img
            role="presentation"
            src="http://www.qbit.co.il/wp-content/uploads/2014/06/POWTOONS.jpg"
          />
        </div>
      </Dialog>
    );
  }
}
