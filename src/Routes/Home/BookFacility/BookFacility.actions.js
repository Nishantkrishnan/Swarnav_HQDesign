import {
  ACTION_FACILITY_MONTHS,
  STORE_FACILITY_MONTHS,
  STORE_FACILITY_DAYS,
  ACTION_FACILITY_SLOTS,
  STORE_FACILITY_SLOTS,
  ACTION_CREATE_BOOK_FACILITY,
} from './BookFacilityConstants';
import SHOW_LOADER from '../HomeConstants';

export function fetchAvailableFacilityDates(facilityId, currentLocationId, year = '', month = '') {
  return {
    type: ACTION_FACILITY_MONTHS,
    payload: {
      facilityId,
      year,
      month,
      currentLocationId,
    },
  };
}

export function fetchAvailableFacilitySlots(facilityId, currentLocationId, date = '') {
  return {
    type: ACTION_FACILITY_SLOTS,
    payload: {
      facilityId,
      currentLocationId,
      date,
    },
  };
}

export function createBookFacility(reqBody) {
  return {
    type: ACTION_CREATE_BOOK_FACILITY,
    payload: reqBody,
  };
}

export function storeAvailableMonths(response) {
  return {
    type: STORE_FACILITY_MONTHS,
    payload: { response },
  };
}

export function storeAvailableDays(response) {
  return {
    type: STORE_FACILITY_DAYS,
    payload: { response },
  };
}

export function storeAvailableSlots(response) {
  return {
    type: STORE_FACILITY_SLOTS,
    payload: { response },
  };
}

export function showLoader(response) {
  return {
    type: SHOW_LOADER,
    payload: { response },
  };
}
