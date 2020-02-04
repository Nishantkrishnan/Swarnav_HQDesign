import {
  GET_POSTS,
  STORE_POSTS,
  CREATE_POSTS,
  TOGGLE_LIKE,
  UPDATE_LIKE_COUNT,
  LOAD_COMMENTS,
  UPDATE_COMMENTS_STORE,
  ACTION_UPDATE_POST,
  STORE_UPDATED_POST,
} from './Dashboard.constants';

export function getPosts(perPage) {
  return {
    type: GET_POSTS,
    payload: { perPage },
  };
}

export function storePosts(response, page) {
  return {
    type: STORE_POSTS,
    payload: { response, page },
  };
}

export function doCreatePost(postBody) {
  return {
    type: CREATE_POSTS,
    payload: postBody,
  };
}

export function toggleLike(userPostId) {
  return {
    type: TOGGLE_LIKE,
    userPostId,
  };
}

export function updateLikesCount(response) {
  return {
    type: UPDATE_LIKE_COUNT,
    payload: { response },
  };
}

export function loadMoreComments(postId) {
  return {
    type: LOAD_COMMENTS,
    payload: postId,
  };
}

export function updateCommentStore(response, postId) {
  return {
    type: UPDATE_COMMENTS_STORE,
    payload: { response, postId },
  };
}

export function updatePost(postId, postBody) {
  return {
    type: ACTION_UPDATE_POST,
    payload: { postId, postBody },
  };
}

export function storeUpdatedPost(response) {
  return {
    type: STORE_UPDATED_POST,
    payload: { response },
  };
}
