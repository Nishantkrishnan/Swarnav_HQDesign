import {
  GET_LOCATIONS,
  STORE_LOCATIONS,
  CHANGE_CURRENT_LOCATION,
  BLOCK_AND_OPEN_LOCATION,
} from './LocationConstants';

export function fetchLocations() {
  return {
    type: GET_LOCATIONS,
  };
}

export function storeLocations(payload) {
  return {
    type: STORE_LOCATIONS,
    payload,
  };
}

export function changeLocations(payload) {
  return {
    type: CHANGE_CURRENT_LOCATION,
    payload,
  };
}

export function blockLocationAndOpen(payload) {
  return {
    type: BLOCK_AND_OPEN_LOCATION,
    payload,
  };
}
