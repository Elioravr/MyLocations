export default (state={
  categories: [],
}, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_FULFILLED": {
      return {
        ...state,
        categories: action.payload
      };
    }
    case "ADD_NEW_CATEGORY": {
      return {
        ...state,
        categories: action.payload
      };
    }
    case "ADD_NEW_CATEGORY_ERROR": {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
}
