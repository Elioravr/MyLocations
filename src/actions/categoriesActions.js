export function fetchCategories(argument) {
  let categories = JSON.parse(localStorage.getItem("MyLocations.categories"));
  categories = categories ? categories : []

  return {
    type: "FETCH_CATEGORIES_FULFILLED",
    payload: categories
  }
}
