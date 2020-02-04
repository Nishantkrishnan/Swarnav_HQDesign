import { fromJS } from 'immutable';
import {
  SHOW_SERVER_ERROR,
  HIDE_SERVER_ERROR,
  ACTION_SHOW_MESSAGEALERT,
  ACTION_HIDE_MESSAGEALERT,
  ACTION_MESSAGEALERT_SET_ERROR,
} from './MessageAlert.constants';
import { createReducerFromObject } from '../../utils/reducerUtils';

export const initialState = fromJS({
  visible: false,
  message: null,
  errors: [],
  hasClose: true,
});

export const reducerFunctions = {
  [SHOW_SERVER_ERROR]: (state, payload) =>
    fromJS({
      visible: true,
      hasClose: false,
      errors: [],
      ...payload,
    }),
  [ACTION_SHOW_MESSAGEALERT]: (state, payload) =>
    fromJS({
      visible: true,
      hasClose: true,
      errors: [],
      ...payload,
    }),
  [ACTION_HIDE_MESSAGEALERT]: () => initialState,
  [ACTION_MESSAGEALERT_SET_ERROR]: (state, payload) =>
    state.merge(
      fromJS({
        visible: true,
        errors: payload.errors ? payload.errors : [payload.error],
      }),
    ),
};

const messageAlertReducer = createReducerFromObject(reducerFunctions, initialState);

export default messageAlertReducer;
