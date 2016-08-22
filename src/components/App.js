import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

import { addNewCategory } from '../actions/categoriesActions';
import { addNewLocation } from '../actions/locationsActions';
import MyLocationsAppBar from './MyLocationsAppBar';
import MyLocationsFooter from './MyLocationsFooter';
import NewCategoryDialog from './NewCategoryDialog';
import NewLocationDialog from './NewLocationDialog';

import '../styles/index.css'

class App extends Component {
  componentWillMount() {
    this.setState({
      openAlert: false,
      alert: ""
    });
  }

  handleCategorySubmit(name) {
    let response = this.props.dispatch(addNewCategory(name))
    this.handleResponse("Category", response, () => {
      this.closeNewCategoryDialog();
      this.refs.footer.handleNewPathname("categories");
    });
  }

  handleLocationSubmit(location) {
    let response = this.props.dispatch(addNewLocation(location))
    this.handleResponse("Location", response, () => {
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

  handleResponse(entityName, response, callback) {
    if (response.error) {
      this.showAlert(response.error);
    }
    else {
      this.showAlert(`${entityName} created!`);
      callback();
    }
  }

  onAddCategoryClick() {
    this.refs.categoryDialog.handleOpen();
  }

  onAddLocationClick() {
    this.refs.locationDialog.handleOpen();
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

  renderChildren() {
    let childrenOptions = {
      showAlert: this.showAlert.bind(this)
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
        />
        <NewCategoryDialog ref="categoryDialog" onSubmit={this.handleCategorySubmit.bind(this)} />
        <NewLocationDialog ref="locationDialog" onSubmit={this.handleLocationSubmit.bind(this)} />
        <div className="main-container">
          {this.renderChildren()}
        </div>
        <Snackbar
          style={snackbarStyle}
          open={this.state.openAlert}
          message={this.state.alert}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
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
