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
    default: {
      return { ...state };
    }
  }
}
