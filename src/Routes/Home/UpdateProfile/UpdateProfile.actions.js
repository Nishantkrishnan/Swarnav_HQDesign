import { ACTION_UPDATE_USER_PROFILE } from './UpdateProfileConstant';

export function updateProfile(inputFields) {
  return {
    type: ACTION_UPDATE_USER_PROFILE,
    payload: inputFields,
  };
}
