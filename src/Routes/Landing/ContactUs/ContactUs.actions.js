import {
  GET_CONTACT_US,
  STORE_CONTACT_US,
} from './ContactUsConstants';

export function fetchContactUs() {
  return {
    type: GET_CONTACT_US,
  };
}

export function storeContactUs(response) {
  return {
    type: STORE_CONTACT_US,
    payload: { response },
  };
}
