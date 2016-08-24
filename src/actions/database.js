import _ from 'lodash';

// This is a localStorage database, therefore many requests
// are being executed. Calculations like new ids for documents
// are being calculated automatically at the database server.
// With a real database, We should manage our requests more sparingly.

// ------------------
// Categories
// ------------------

export function getCategories() {
  return getCollectionArray("categories");
}

export function getCategory(id) {
  return getDocument("categories", id);
}

export function addCategory(category) {
  return addDocument("categories", category);
}

export function isCategoryExists(category) {
  return isDocumentExists("categories", "name", category.name)
}

export function removeCategoryById(categoryToRemoveId) {
  return removeDocument("categories", categoryToRemoveId);
}

// ------------------
// Locations
// ------------------

export function getLocations(categoryId) {
  if (categoryId) {
    return getCollectionWhere("locations", "categoriesIds", parseInt(categoryId, 10), { manyToMany: true });
  }
  return getCollectionArray("locations");
}

export function addLocation(newLocation) {
  return addDocument("locations", newLocation);
}

export function isLocationExists(location) {
  return isDocumentExists("locations", "name", location.name)
}

export function removeLocationById(locationToRemoveId) {
  return removeDocument("locations", locationToRemoveId);
}

// ------------------
// Database functions
// ------------------

function getNewId(collectionName) {
  let collection = getCollection(collectionName);
  let biggestId = _.maxBy(_.keys(collection), (id) => {
    return parseInt(id, 10);
  });
  return biggestId ? ++biggestId : 1;
}

function getCollection(collectionName) {
  let collection = JSON.parse(localStorage.getItem(`MyLocations.${collectionName}`));
  collection = collection ? collection : {}

  return collection;
}

function getCollectionArray(collectionName) {
  return _.values(getCollection(collectionName));
}

function getCollectionWhere(collectionName, field, value, options = {}) {
  let collection = getCollectionArray(collectionName);

  return collection.filter((document) => {
    if (options.manyToMany) {
      return _(document[field]).includes(value);
    }

    return (document[field] === value);
  });
}

function getDocument(collectionName, id) {
  return getCollection(collectionName)[id];
}

function updateDocument(collectionName, newDocument) {
  let collection = getCollection(collectionName);
  collection[newDocument.id] = newDocument

  return setCollection(collectionName, collection);
}

function addDocument(collectionName, newDocument) {
  if (newDocument.id) return updateDocument(collectionName, newDocument);

  let id = getNewId(collectionName);
  newDocument = { ...newDocument, id };

  let collection = getCollection(collectionName);
  collection[id] = newDocument;
  return setCollection(collectionName, collection);
}

function removeDocument(collectionName, documentToRemoveId) {
  let collection = getCollection(collectionName);
  delete collection[documentToRemoveId];

  return setCollection(collectionName, collection);
}

function isDocumentExists(collectionName, field, value) {
  let collection = getCollectionArray(collectionName);
  return _(collection).some((document) => {
    return document[field] === value;
  });
}

function setCollection(collectionName, newCollection) {
  localStorage.setItem(`MyLocations.${collectionName}`, JSON.stringify(newCollection));
  return _.values(newCollection);
}
