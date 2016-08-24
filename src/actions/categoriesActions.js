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

export function addNewCategory(category) {
  let categoryNewAndExist = isCategoryExists(category) && !category.id;

  if (categoryNewAndExist) {
    return {
      type: "SUBMIT_CATEGORY_ERROR",
      error: "Category is already exist"
    }
  }
  else {
    let newCategories = addCategory(category);

    return {
      type: "SUBMIT_CATEGORY",
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
