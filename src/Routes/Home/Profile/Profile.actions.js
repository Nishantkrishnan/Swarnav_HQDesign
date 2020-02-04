import {
  GET_PROFILE,
  STORE_PROFILE,
  UPDATE_PROFILE_PIC,
} from './ProfileConstants';

export function fetchProfile() {
  return {
    type: GET_PROFILE,
  };
}




export function storeProfile(response) {
  return {
    type: STORE_PROFILE,
    payload: { response },
  };
}

export function updateProfileImg(reqBody) {
  return {
    type: UPDATE_PROFILE_PIC,
    reqBody,
  };
}
