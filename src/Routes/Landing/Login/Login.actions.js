import {
  ACTION_LOGIN_REQUEST,
  ACTION_STORE_USER_PROFILE_INFO,
  ACTION_LOGOUT,
  RESET_STORE,
} from './LoginPageConstants';

export function logIn(mobileNo, password) {
  return {
    type: ACTION_LOGIN_REQUEST,
    payload: { mobile_no: mobileNo, password },
  };
}

export function storeUserProfileInfo(response) {
  return {
    type: ACTION_STORE_USER_PROFILE_INFO,
    payload: { response },
  };
}

export function logOut({ userToken }) {
  return {
    type: ACTION_LOGOUT,
    payload: userToken,
  };
}

export function clearStore() {
  return {
    type: RESET_STORE,
  };
}
