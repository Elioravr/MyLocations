export function fetchCategories(argument) {
  return {
    type: "FETCH_CATEGORIES_FULFILLED",
    payload: [
      { _id: "1", name: "Cinema" },
      { _id: "2", name: "Restorant" },
      { _id: "3", name: "Office" }
    ]
  }
}
