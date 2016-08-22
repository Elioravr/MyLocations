export default (state={
  locations: [],
  sorting: false
}, action) => {
  switch (action.type) {
    case "FETCH_LOCATIONS_FULFILLED": {
      return {
        ...state,
        locations: action.payload
      };
    }
    case "SORT_LOCATIONS": {
      return {
        ...state,
        sorting: action.payload
      };
    }
    case "ADD_NEW_LOCATION": {
      return {
        ...state,
        locations: action.payload
      };
    }
    case "ADD_NEW_LOCATION_ERROR": {
      return {
        ...state,
        error: action.payload
      };
    }
    case "REMOVE_LOCATIONS_FULFILLED": {
      return {
        ...state,
        locations: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
}
