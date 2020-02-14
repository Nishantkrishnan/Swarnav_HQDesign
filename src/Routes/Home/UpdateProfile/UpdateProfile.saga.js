import { replace } from 'react-router-redux';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import { storeProfile } from '../Profile/Profile.actions';
import * as constants from './UpdateProfileConstant';
import * as api from './api';

function* updateProfile({ payload }) {
  try {
    const response = yield api.updateProfile(payload);
    yield store.dispatch(storeProfile(response.data));
    store.dispatch(
      showMessageAlert({
        message: response.message,
        visible: true,
        color: '#61d079',
      }),
    );
    yield put(replace('/'));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* UpdateProfileSagas() {
  yield [
    fork(takeLatest, constants.ACTION_UPDATE_USER_PROFILE, updateProfile),
  ];
}
