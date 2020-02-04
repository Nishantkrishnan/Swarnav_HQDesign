import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import * as constants from './ChangePasswordConstants';
import * as api from './api';
import { store } from '../../../index';

function* changePassword({ payload }) {
  try {
    const response = yield api.updatePassword(payload);
    store.dispatch(
      showMessageAlert({
        message: response.message,
        visible: true,
        color: '#61d079',
      }),
    );
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* changePasswordSagas() {
  yield [
    fork(takeLatest, constants.ACTION_CHANGE_PASSWORD, changePassword),
  ];
}
