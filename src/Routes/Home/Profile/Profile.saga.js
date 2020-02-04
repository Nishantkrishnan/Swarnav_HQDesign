import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Profile.actions';
import * as constants from './ProfileConstants';
import * as api from './api';

function* fetchProfile() {
  try {
    const response = yield api.getProfile();
    yield store.dispatch(actions.storeProfile(response.data));
  } catch (e) {
    console.log('eeeeeeeeeeeeeee',e);

    ShowAlert(e);
  }
}


function* fetchFollowers() {
  try {
    const response = yield api.getFollowers();
    yield store.dispatch(actions.storeFollowers(response.data));
  } catch (e) {
    console.log('eeeeeeeeeeeeeee',e);

    ShowAlert(e);
  }
}


function* updateProfile(payload) {
  try {
    const response = yield api.updateProfileImg(payload.reqBody);
    yield store.dispatch(actions.storeProfile(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* ProfileSagas() {
  yield [
    fork(takeLatest, constants.GET_PROFILE, fetchProfile),
    fork(takeLatest, constants.UPDATE_PROFILE_PIC, updateProfile),
  ];
}
