import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getPosts = (payload, pageCount) =>
  axios.get(`${authInfo.mainUrl}/api/v1/social/dashboard?page=${pageCount}&per_page=${payload.perPage}`,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    },
  ).then(res => res.data);

export const createPost = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/social/post`, payload, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const toogleLike = UserPostId =>
  axios.post(`${authInfo.mainUrl}/api/v1/social/likes/toggle_like`,
    { user_post_id: UserPostId },
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    },
  ).then(res => res.data);

export const deleteComment = commentId =>
  axios.post(`${authInfo.mainUrl}/api/v1/social/comments/${commentId}`,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    },
  ).then(res => res.data);

export const loadComments = (postId, pageNumber) =>
  axios.get(`/api/v1/social/comments/${postId}/previous_comments?page=${pageNumber}`,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    },
  ).then(res => res.data);

export const updatePost = payload =>
  axios.patch(`api/v1/social/post/${payload.postId}`,
    payload.postBody,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    },
  ).then(res => res.data);
