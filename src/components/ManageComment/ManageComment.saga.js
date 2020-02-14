import { fork, takeLatest } from 'redux-saga/effects';
import { store } from '../../index';
import ShowAlert from '../../containers/ShowAlert/ShowAlert';
import * as actions from './ManageComment.actions';
import * as constants from './ManageComment.constants';
import * as api from './api';

function* deleteComment({ payload }) {
  try {
    const response = yield api.deleteComment(payload.commentId);
    yield store.dispatch(actions.updateCommentList(response.comments_count, payload.commentId, response.post_id));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* ManageCommentSagas() {
  yield [
    fork(takeLatest, constants.DELETE_COMMENT, deleteComment),
  ];
}
