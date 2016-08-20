import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import categories from './categoriesReducer';
import locations from './locationsReducer';

export default combineReducers({
  categories,
  locations,
  routing: routerReducer
});
