import { replace } from 'react-router-redux';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Login.actions';
import * as constants from './LoginPageConstants';
import * as api from './api';

function* loginUser({ payload }) {
  try {
    const response = yield api.loginUser(payload);
    localStorage.setItem('coworks-accessToken-remember', response.data.token);
    yield store.dispatch(actions.storeUserProfileInfo(response));
  } catch (e) {
    ShowAlert(e);
  }
}

function* logout({ payload }) {
  try {
    localStorage.clear();
    yield store.dispatch(actions.clearStore());
    if (payload === null) {
      yield store.dispatch(showMessageAlert({
        message: 'Logged out succesfully!',
        visible: true,
        color: '#61d079',
      }));
    } else {
      yield store.dispatch(showMessageAlert({
        message: 'Your session has expired, please login with your username and password to continue',
        visible: true,
        color: '#e53e3d',
      }));
    }
    yield put(replace('/'));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* LoginSagas() {
  yield [
    fork(takeLatest, constants.ACTION_LOGIN_REQUEST, loginUser),
    fork(takeLatest, constants.ACTION_LOGOUT, logout),
  ];
}
