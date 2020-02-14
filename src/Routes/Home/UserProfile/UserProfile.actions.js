import {
  GET_USER_PROFILE,
  STORE_USER_PROFILE,
  CONNECT_USER_PROFILE,
  DISCONNECT_USER_PROFILE,
  UPDATE_USER_PROFILE_CONNECTION,
} from './UserProfileConstants';

export function fetchUserProfile(profileID) {
  return {
    type: GET_USER_PROFILE,
    payload: { profileID },
  };
}

export function storeUserProfile(response) {
  return {
    type: STORE_USER_PROFILE,
    payload: { response },
  };
}

export function doConnect(profileID) {
  return {
    type: CONNECT_USER_PROFILE,
    payload: { profileID },
  };
}

export function doDisconnect(profileID) {
  return {
    type: DISCONNECT_USER_PROFILE,
    payload: { profileID },
  };
}

export function updateConnection(following) {
  return {
    type: UPDATE_USER_PROFILE_CONNECTION,
    payload: following,
  };
}
