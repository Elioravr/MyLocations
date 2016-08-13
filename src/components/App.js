import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import { fetchCategories, addNewCategory, removeCategory } from '../actions/categoriesActions';
import CategoriesList from './CategoriesList';
import MyLocationsAppBar from './MyLocationsAppBar';
import MyLocationsFooter from './MyLocationsFooter';
import NewCategoryDialog from './NewCategoryDialog';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());

    this.setState({
      openAlert: false,
      alert: ""
    });
  }

  onAddCategoryClick() {
    this.refs.categoryDialog.handleOpen();
  }

  handleCategorySubmit(name) {
    let response = this.props.dispatch(addNewCategory(name))

    if (response.error) {
      this.showAlert(response.error);
    }
    else {
      this.showAlert("Category created!");
      this.closeNewCategoryDialog();
    }
  }

  closeNewCategoryDialog() {
    this.refs.categoryDialog.handleClose();
  }

  removeCategory(category) {
    let response = this.props.dispatch(removeCategory(category));

    if (!response.error) {
      this.showAlert("Category removed!");
    }
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

  render() {
    const snackbarStyle = {
      "textAlign": "center"
    };

    return (
      <div className='App'>
        <MyLocationsAppBar onAddCategoryClick={this.onAddCategoryClick.bind(this)} />
        <NewCategoryDialog ref="categoryDialog" onSubmit={this.handleCategorySubmit.bind(this)} />
        <div className="main-container">
          <CategoriesList
            categories={this.props.categories}
            removeCategory={this.removeCategory.bind(this)}
          />
        </div>
        <Snackbar
          style={snackbarStyle}
          open={this.state.openAlert}
          message={this.state.alert}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <MyLocationsFooter />
      </div>
    );
  }
}

export default connect((store) => {
  return {
    categories: store.categories.categories
  };
})(App);
