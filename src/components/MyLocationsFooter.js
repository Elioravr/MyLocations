import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconStyle from 'material-ui/svg-icons/image/style';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const categoriesIcon = <IconStyle />;
const locationsIcon = <IconLocationOn />;

class MyLocationsFooter extends Component {
  componentWillMount() {
    this.state = {
      selectedIndex: 0,
    };
  }

  select(index) {
    this.setState({selectedIndex: index});
  }


  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} className="footer">
          <BottomNavigationItem
            label="Categories"
            icon={categoriesIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Locations"
            icon={locationsIcon}
            onTouchTap={() => this.select(1)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default MyLocationsFooter;
