import {
  ACTION_CHANGE_PASSWORD,
} from './ChangePasswordConstants';

function changePassword(password, passwordConfirmation, currentPassword) {
  return {
    type: ACTION_CHANGE_PASSWORD,
    payload: {
      old_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation,
    },
  };
}

export default changePassword;
