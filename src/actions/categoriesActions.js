import _ from 'lodash';

export function fetchCategories() {
  return {
    type: "FETCH_CATEGORIES_FULFILLED",
    payload: getCategories()
  }
}

export function addNewCategory(name) {
  let categories = getCategories();
  let categoryExist = _(categories).some((category) => {
    return category.name === name;
  });

  if (categoryExist) {
    return {
      type: "ADD_NEW_CATEGORY_ERROR",
      error: "Category already exist"
    }
  }
  else {
    let newCategory = { name };
    categories.push(newCategory);
    setCategories(categories);

    return {
      type: "ADD_NEW_CATEGORY",
      payload: categories
    }
  }
}

export function removeCategory(categoryToRemove) {
  let categories = getCategories().filter((category) => {
    return category.name !== categoryToRemove.name
  });

  setCategories(categories);

  return {
    type: "REMOVE_CATEGORIES_FULFILLED",
    payload: categories
  }
}

function getCategories() {
  let categories = JSON.parse(localStorage.getItem("MyLocations.categories"));
  categories = categories ? categories : []

  return categories;
}

function setCategories(categories) {
  localStorage.setItem("MyLocations.categories", JSON.stringify(categories));
}
