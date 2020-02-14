import { fork, takeLatest } from 'redux-saga/effects';
import { store } from '../../../index';
import * as actions from './Followers.actions';
import * as constants from './FollowersConstants';
import * as api from './api';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';

function* fetchFollowers() {
  try {
    const response = yield api.getFollowers();
    yield store.dispatch(actions.storeFollowers(response));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* FollowersSagas() {
  yield [
    fork(takeLatest, constants.GET_FOLLOWERS, fetchFollowers),
  ];
}
