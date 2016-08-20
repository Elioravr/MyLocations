import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconStyle from 'material-ui/svg-icons/image/style';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const categoriesIcon = <IconStyle />;
const locationsIcon = <IconLocationOn />;

class MyLocationsFooter extends Component {
  componentWillMount() {
    this.categoriesPath = 0;
    this.locationsPath = 1;
    let index;

    switch (this.props.location.pathname) {
      case "/categories":
        index = this.categoriesPath;
        break;
      case "/locations":
        index = this.locationsPath;
        break;
      default:
        index = 0;
        break;
    }

    this.state = {
      selectedIndex: index,
    };
  }

  select(index) {
    let path;

    switch (index) {
      case this.categoriesPath:
        path = "categories";
        break;
      case this.locationsPath:
        path = "locations";
        break;
      default:
        path = "";
        break;
    }

    this.setState({selectedIndex: index});
    browserHistory.push(`/${path}`);
  }


  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} className="footer">
          <BottomNavigationItem
            label="Categories"
            icon={categoriesIcon}
            onTouchTap={() => this.select(this.categoriesPath)}
          />
          <BottomNavigationItem
            label="Locations"
            icon={locationsIcon}
            onTouchTap={() => this.select(this.locationsPath)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default MyLocationsFooter;
