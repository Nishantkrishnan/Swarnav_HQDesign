import {
  SHOW_SERVER_ERROR,
  HIDE_SERVER_ERROR,
  ACTION_SHOW_MESSAGEALERT,
  ACTION_HIDE_MESSAGEALERT,
  ACTION_MESSAGEALERT_SET_ERROR,
} from './MessageAlert.constants';

export const showMessageAlert = ({ message, type, ...args }) => ({
  type: ACTION_SHOW_MESSAGEALERT,
  payload: { message, ...args },
});

export const hideMessageAlert = () => ({ type: ACTION_HIDE_MESSAGEALERT });

export const showServerError = ({ message }) => ({
  type: SHOW_SERVER_ERROR,
  payload: { message },
});

export const hideServerError = () => ({ type: HIDE_SERVER_ERROR });
