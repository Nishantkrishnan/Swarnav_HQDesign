import {
  CREATE_COMMENT,
  STORE_COMMENT,
} from './CommentForm.constants';

export function doComment(postId, comment) {
  return {
    type: CREATE_COMMENT,
    payload: {
      user_post_id: postId,
      comment_body: comment,
    },
  };
}

export function storeComment(comment, postId) {
  return {
    type: STORE_COMMENT,
    payload: {
      comment,
      postId,
    },
  };
}