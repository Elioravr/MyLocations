import { getCategories, isCategoryExists, addCategory, removeCategoryById } from './database';

export function fetchCategories() {
  return {
    type: "FETCH_CATEGORIES_FULFILLED",
    payload: getCategories()
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
