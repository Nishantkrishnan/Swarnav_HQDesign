import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../containers/ShowAlert/ShowAlert';
import { store } from '../../index';
import * as actions from './ManagePost.actions';
import * as constants from './ManagePost.constants';
import * as api from './api';

function* deletePost({ payload }) {
  try {
    yield api.deletePost(payload.postId);
    yield store.dispatch(actions.updatePostList(payload.postId));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* ManagePostSagas() {
  yield [
    fork(takeLatest, constants.DELETE_POST, deletePost),
  ];
}
