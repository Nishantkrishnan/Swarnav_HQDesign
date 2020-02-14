import { fork, takeLatest } from 'redux-saga/effects';
import { store } from '../../../index';
import * as actions from './Following.actions';
import * as constants from './FollowingConstants';
import * as api from './api';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';

function* fetchFollowing() {
  try {
    const response = yield api.getFollowing();
    yield store.dispatch(actions.storeFollowing(response));
  } catch (e) {
    console.log('e',e);
    
    ShowAlert(e);
  }
}

export default function* FollowingSagas() {
  yield [
    fork(takeLatest, constants.GET_FOLLOWING, fetchFollowing),
  ];
}
