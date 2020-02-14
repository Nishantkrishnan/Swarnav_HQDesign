import {
  GET_MY_ACTIVITY,
  STORE_MY_ACTIVITY,
  CANCEL_FACILITY_BOOKING,
  CANCEL_SERVICE_REQUEST,
  CANCEL_TICKET,
} from './MyActivityConstants';

export function fetchMyActivity(bookingType) {
  return {
    type: GET_MY_ACTIVITY,
    bookingType,
  };
}

export function storeMyActivity(response, bookingType) {
  return {
    type: STORE_MY_ACTIVITY,
    payload: { response, bookingType },
  };
}

export function cancelServiceRequest(id) {
  return {
    type: CANCEL_SERVICE_REQUEST,
    payload: { id },
  };
}

export function cancelFacilityBooking(bookingId) {
  return {
    type: CANCEL_FACILITY_BOOKING,
    payload: { bookingId },
  };
}

export function cancelTicket(bookingId) {
  return {
    type: CANCEL_TICKET,
    payload: { bookingId },
  };
}
