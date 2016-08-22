import { getLocations, isLocationExists, addLocation, removeLocationById } from './database';

export function fetchLocations(categoryId) {
  return {
    type: "FETCH_LOCATIONS_FULFILLED",
    payload: getLocations(categoryId)
  }
}

export function addNewLocation(location) {
  let locationExist = isLocationExists(location.name);

  if (locationExist) {
    return {
      type: "ADD_NEW_LOCATION_ERROR",
      error: "Location is already exist"
    }
  }
  else {
    let newLocation = addLocation(location);

    return {
      type: "ADD_NEW_LOCATION",
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
