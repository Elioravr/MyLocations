import { getLocations, isLocationExists, addLocation, removeLocationById } from './database';

export function fetchLocations(categoryId) {
  return {
    type: "FETCH_LOCATIONS_FULFILLED",
    payload: getLocations(categoryId)
  }
}

export function sortLocations(field) {
  return {
    type: "SORT_LOCATIONS",
    payload: field
  }
}

export function addNewLocation(location) {
  let locationNewAndExist = isLocationExists(location) && !location.id;

  if (locationNewAndExist) {
    return {
      type: "SUBMIT_LOCATION_ERROR",
      error: "Location is already exist"
    }
  }
  else {
    let newLocation = addLocation(location);

    return {
      type: "SUBMIT_LOCATION",
      payload: newLocation
    }
  }
}

export function removeLocation(locationToRemoveId) {
  let newLocations = removeLocationById(locationToRemoveId);

  return {
    type: "REMOVE_LOCATIONS_FULFILLED",
    payload: newLocations
  }
}
