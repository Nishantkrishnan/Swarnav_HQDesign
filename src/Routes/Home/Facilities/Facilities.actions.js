import {
  GET_FACILITIES,
  STORE_FACILITIES,
} from './FacilitiesConstants';

export function getFacilities(payload) {
  return {
    type: GET_FACILITIES,
    payload,
  };
}

export function storeFacilities(response) {
  return {
    type: STORE_FACILITIES,
    payload: { response },
  };
}
