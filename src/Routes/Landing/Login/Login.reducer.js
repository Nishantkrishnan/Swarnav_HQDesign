import { fromJS } from 'immutable';
import { createReducerFromObject } from '../../../utils/reducerUtils';
import { ACTION_STORE_USER_PROFILE_INFO, RESET_STORE } from './LoginPageConstants';

export const initialState = fromJS({
  error: null,
  loggedIn: false,
  // data: {
  //   userId: localStorage.getItem('userId') || null,
  //   userSessionToken: null,
  // },
  userInfo: null,
});

// export const userDataOnLogin = (state, payload) =>
//   fromJS({
//     error: '',
//     loggedIn: true,
//     data: {
//       userId: payload.response.id,
//       userSessionToken: payload.response.token,
//     },
//     userInfo: null,
//   });

const reducerFunctions = {
  [ACTION_STORE_USER_PROFILE_INFO]: (state, payload) => state.merge({ 
    userInfo: fromJS(payload.response.data),
    loggedIn: true,
  }),
  [RESET_STORE]: state => state.merge({
    loggedIn: false,
    userInfo: null,
  }),
};

const loginReducer = createReducerFromObject(reducerFunctions, initialState);
export default loginReducer;
