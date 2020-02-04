import { fork, takeLatest } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import { fetchFollowing } from '../Following/Following.actions';
import * as actions from './UserProfile.actions';
import * as constants from './UserProfileConstants';
import * as api from './api';

function* fetchUserProfile({ payload }) {
  try {
    const response = yield api.getUserProfile(payload.profileID);
    yield store.dispatch(actions.storeUserProfile(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}

function* connectUserProfile({ payload }) {
  const response = yield api.connectUserProfile(payload.profileID);
  yield store.dispatch(actions.updateConnection(response));
  yield store.dispatch(fetchFollowing());
  store.dispatch(
    showMessageAlert({
      message: 'You have successfully started following.',
      visible: true,
      color: '#61d079',
    }),
  );
}

function* disconnectUserProfile({ payload }) {
  const response = yield api.disconnectUserProfile(payload.profileID);
  yield store.dispatch(actions.updateConnection(response));
  yield store.dispatch(fetchFollowing());
  store.dispatch(
    showMessageAlert({
      message: 'You have successfully stoped following.',
      visible: true,
      color: '#61d079',
    }),
  );
}

export default function* UserProfileSagas() {
  yield [
    fork(takeLatest, constants.GET_USER_PROFILE, fetchUserProfile),
    fork(takeLatest, constants.CONNECT_USER_PROFILE, connectUserProfile),
    fork(takeLatest, constants.DISCONNECT_USER_PROFILE, disconnectUserProfile),
  ];
}
