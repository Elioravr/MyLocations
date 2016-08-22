import { getCategories, isCategoryExists, addCategory, updateCategory, removeCategoryById, getCategory } from './database';

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
  let categoryExist = isCategoryExists(category);

  if (categoryExist) {
    return {
      type: "ADD_NEW_CATEGORY_ERROR",
      error: "Category is already exist"
    }
  }
  else {
    let newCategories;

    if (category.id) {
      newCategories = updateCategory(category);
    }
    else {
      newCategories = addCategory(category);
    }

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
