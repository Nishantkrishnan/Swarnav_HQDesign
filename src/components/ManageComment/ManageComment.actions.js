import {
  DELETE_COMMENT,
  UPDATE_COMMENT_LIST,
} from './ManageComment.constants';

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    payload: { commentId },
  };
}

export function updateCommentList(commentCount, commentId, postId) {
  return {
    type: UPDATE_COMMENT_LIST,
    payload: {
      commentCount,
      commentId,
      postId,
    },
  };
}
