import { fork, takeLatest, select } from 'redux-saga/effects';
import { store } from '../../../index';
import * as actions from './Dashboard.actions';
import * as constants from './Dashboard.constants';
import * as api from './api';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';

function* getPosts({ payload }) {
  try {
    const pageCount = yield select(state => state.home.get('pageCount'));
    const response = yield api.getPosts(payload, pageCount);
    yield store.dispatch(actions.storePosts(response, pageCount));
  } catch (e) {
    console.log(e);
    ShowAlert(e);
  }
}

function* doCreatePost({ payload }) {
  try {
    const response = yield api.createPost(payload);
    yield store.dispatch(actions.storePosts(response, 0));
  } catch (e) {
    ShowAlert(e);
  }
}

function* toggleLike(payload) {
  try {
    const response = yield api.toogleLike(payload.userPostId);
    yield store.dispatch(actions.updateLikesCount(response));
  } catch (e) {
    ShowAlert(e);
  }
}


function* loadComments({ payload }) {
  try {
    const postsIndex = yield select(state => state.home.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === payload);
    }));

    const pageNumber = yield select(state => state.home
      .get('posts').get('user_posts')
      .get(postsIndex)
      .get('comments')
      .get('page_number'));
    const response = yield api.loadComments(payload, (pageNumber + 1));
    yield store.dispatch(actions.updateCommentStore(response, payload));
  } catch (e) {
    ShowAlert(e);
  }
}

function* updatePost({ payload }) {
  try {
    const response = yield api.updatePost(payload);
    yield store.dispatch(actions.storeUpdatedPost(response));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* dashboardSagas() {
  yield [
    fork(takeLatest, constants.GET_POSTS, getPosts),
    fork(takeLatest, constants.CREATE_POSTS, doCreatePost),
    fork(takeLatest, constants.TOGGLE_LIKE, toggleLike),
    fork(takeLatest, constants.LOAD_COMMENTS, loadComments),
    fork(takeLatest, constants.ACTION_UPDATE_POST, updatePost),
  ];
}
