import {
  GET_ABOUT_US,
  STORE_ABOUT_US,
} from './AboutUsConstants';

export function fetchAboutUs() {
  return {
    type: GET_ABOUT_US,
  };
}

export function storeAboutUs(response) {
  return {
    type: STORE_ABOUT_US,
    payload: { response },
  };
}

// export default storeProfile;
