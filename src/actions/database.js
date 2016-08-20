import _ from 'lodash';

// This is a localStorage database, therefore many requests
// are being executed. Calculations like new ids for documents
// are being calculated automatically at the database server.
// With a real database, We should manage our requests more sparingly.

// ------------------
// Categories
// ------------------

export function getCategories() {
  return getCollection("categories");
}

export function addCategory(name) {
  return addDocument("categories", { name });
}

export function isCategoryExists(name) {
  return isDocumentExists("categories", "name", name)
}

export function removeCategoryById(categoryToRemoveId) {
  return removeDocument("categories", categoryToRemoveId);
}

// ------------------
// Locations
// ------------------

export function getLocations() {
  return getCollection("locations");
}

export function addLocation(newLocation) {
  return addDocument("locations", newLocation);
}

export function isLocationExists(name) {
  return isDocumentExists("locations", "name", name)
}

export function removeLocationById(locationToRemoveId) {
  return removeDocument("locations", locationToRemoveId);
}

// ------------------
// Database functions
// ------------------

function getNewId(collectionName) {
  let collection = getCollection(collectionName);
  let biggestId = _(collection).map('id').flatten().max();
  return biggestId ? ++biggestId : 1;
}

function getCollection(collectionName) {
  let collection = JSON.parse(localStorage.getItem(`MyLocations.${collectionName}`));
  collection = collection ? collection : []

  return collection;
}

function addDocument(collectionName, newDocument) {
  let id = getNewId(collectionName);
  newDocument = { ...newDocument, id };

  let collection = getCollection(collectionName);
  collection.push(newDocument);
  return setCollection(collectionName, collection);
}

function removeDocument(collectionName, documentToRemoveId) {
  let collection = getCollection(collectionName).filter((document) => {
    return document.id !== documentToRemoveId;
  });

  return setCollection(collectionName, collection);
}

function isDocumentExists(collectionName, field, value) {
  let collection = getCollection(collectionName);
  return _(collection).some((document) => {
    return document[field] === value;
  });
}

function setCollection(collectionName, newCollection) {
  localStorage.setItem(`MyLocations.${collectionName}`, JSON.stringify(newCollection));
  return newCollection;
}
