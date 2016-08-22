import { getCategories, isCategoryExists, addCategory, removeCategoryById, getCategory } from './database';

export function fetchCategories() {
  return {
    type: "FETCH_CATEGORIES_FULFILLED",
    payload: getCategories()
  }
}

export function fetchCategory(id) {
  return {
    type: "FETCH_CATEGORY_FULFILLED",
    payload: {
      category: getCategory(id)
    }
  }
}

export function addNewCategory(name) {
  let categoryExist = isCategoryExists(name);

  if (categoryExist) {
    return {
      type: "ADD_NEW_CATEGORY_ERROR",
      error: "Category is already exist"
    }
  }
  else {
    let newCategories = addCategory(name);

    return {
      type: "ADD_NEW_CATEGORY",
      payload: newCategories
    }
  }
}

export function removeCategory(categoryToRemoveId) {
  let newCategories = removeCategoryById(categoryToRemoveId);

  return {
    type: "REMOVE_CATEGORIES_FULFILLED",
    payload: newCategories
  }
}
