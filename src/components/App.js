import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

import { addNewCategory } from '../actions/categoriesActions';
import { addNewLocation } from '../actions/locationsActions';
import MyLocationsAppBar from './MyLocationsAppBar';
import MyLocationsFooter from './MyLocationsFooter';
import NewCategoryDialog from './NewCategoryDialog';
import NewLocationDialog from './NewLocationDialog';
import AboutDialog from './AboutDialog';

import '../styles/index.css'

class App extends Component {
  componentWillMount() {
    this.setState({
      openAlert: false,
      alert: ""
    });
  }

  handleCategorySubmit(category) {
    let response = this.props.dispatch(addNewCategory(category))
    this.handleResponse("Category", this.refs.categoryDialog, response, () => {
      this.closeNewCategoryDialog();
      let path = category.id ? `categories/${category.id}` : "categories"
      this.refs.footer.handleNewPathname(path);
    });
  }

  handleLocationSubmit(location) {
    let response = this.props.dispatch(addNewLocation(location))
    this.handleResponse("Location", this.refs.locationDialog, response, () => {
      this.closeNewLocationDialog();
      this.refs.footer.handleNewPathname("locations");
    });
  }

  closeNewCategoryDialog() {
    this.refs.categoryDialog.handleClose();
  }

  closeNewLocationDialog() {
    this.refs.locationDialog.handleClose();
  }

  handleResponse(entityName, dialog, response, callback) {
    if (response.error) {
      dialog.showValidationMessage(response.error);
    }
    else {
      this.showAlert(`${entityName} submited!`);
      callback();
    }
  }

  onAddCategoryClick(options = {}) {
    this.refs.categoryDialog.handleOpen(options);
  }

  onAddLocationClick(options = {}) {
    this.refs.locationDialog.handleOpen(options);
  }

  onAboutClick() {
    this.refs.aboutDialog.handleOpen();
  }

  showAlert(alert) {
    if (!alert) {
      return;
    }

    this.setState({
      openAlert: true,
      alert: alert
    });
  }

  handleRequestClose() {
    this.setState({
      openAlert: false,
      alert: ""
    });
  }

  renderChildren() {
    let childrenOptions = {
      showAlert: this.showAlert.bind(this),
      editCategory: this.onAddCategoryClick.bind(this),
      editLocation: this.onAddLocationClick.bind(this)
    };

    return this.props.children && React.cloneElement(this.props.children, childrenOptions);
  }

  render() {
    const snackbarStyle = {
      "textAlign": "center"
    };

    return (
      <div className='App'>
        <MyLocationsAppBar
          onAddCategoryClick={this.onAddCategoryClick.bind(this)}
          onAddLocationClick={this.onAddLocationClick.bind(this)}
          onAboutClick={this.onAboutClick.bind(this)}
        />
        <NewCategoryDialog ref="categoryDialog" onSubmit={this.handleCategorySubmit.bind(this)} />
        <NewLocationDialog ref="locationDialog" onSubmit={this.handleLocationSubmit.bind(this)} />
        <AboutDialog ref="aboutDialog" />
        <div className="main-container">
          {this.renderChildren()}
        </div>
        <Snackbar
          style={snackbarStyle}
          open={this.state.openAlert}
          message={this.state.alert}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
        <MyLocationsFooter
          ref="footer"
          location={this.props.location}
        />
      </div>
    );
  }
}

export default connect((store) => {
  return {};
})(App);
