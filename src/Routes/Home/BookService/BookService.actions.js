import {
  SERVICE_REQUEST_PREFERENCE,
  STORE_SERVICE_REQUEST_PREFERENCE,
  CREATE_SERVICE_BOOKING,
} from './BookServiceConstants';
import SHOW_LOADER from '../HomeConstants';

export function serviceRequestPreferences(serviceId, currentLocationId, date = '') {
  return {
    type: SERVICE_REQUEST_PREFERENCE,
    payload: {
      serviceId,
      date,
      currentLocationId,
    },
  };
}

export function storeServiceRequestPreferences(response) {
  return {
    type: STORE_SERVICE_REQUEST_PREFERENCE,
    payload: { response },
  };
}

export function createServiceBooking(reqBody, serviceTypeId, serviceId) {
  return {
    type: CREATE_SERVICE_BOOKING,
    serviceTypeId,
    serviceId,
    reqBody,
  };
}

export function showLoader(response) {
  return {
    type: SHOW_LOADER,
    payload: { response },
  };
}
