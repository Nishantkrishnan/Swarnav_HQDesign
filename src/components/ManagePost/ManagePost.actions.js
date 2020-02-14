import {
  DELETE_POST,
  UPDATE_POST_LIST,
} from './ManagePost.constants';

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    payload: { postId },
  };
}

export function updatePostList(postId) {
  return {
    type: UPDATE_POST_LIST,
    payload: {
      postId,
    },
  };
}
