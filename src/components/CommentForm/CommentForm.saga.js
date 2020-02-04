import { fork, takeLatest } from 'redux-saga/effects';
import { store } from '../../index';
import ShowAlert from '../../containers/ShowAlert/ShowAlert';
import * as actions from './CommentForm.actions';
import * as constants from './CommentForm.constants';
import * as api from './api';

function* doComment({ payload }) {
  try {
    const response = yield api.doComment(payload);
    yield store.dispatch(actions.storeComment(response.comments, payload.user_post_id));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* FeedbackSagas() {
  yield [
    fork(takeLatest, constants.CREATE_COMMENT, doComment),
  ];
}
