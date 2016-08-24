export default (state={
  categories: [],
  category: {}
}, action) => {
  switch (action.type) {
    case "FETCH_CATEGORIES_FULFILLED": {
      return {
        ...state,
        categories: action.payload
      };
    }
    case "FETCH_CATEGORY_FULFILLED": {
      return {
        ...state,
        category: action.payload.category,
      };
    }
    case "SUBMIT_CATEGORY": {
      return {
        ...state,
        categories: action.payload
      };
    }
    case "SUBMIT_CATEGORY_ERROR": {
      return {
        ...state,
        error: action.payload
      };
    }
    case "REMOVE_CATEGORIES_FULFILLED": {
      return {
        ...state,
        categories: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
}
