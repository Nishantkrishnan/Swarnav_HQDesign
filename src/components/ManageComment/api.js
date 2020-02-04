import axios from 'axios';
import { authInfo } from '../../utils/config';
export const deleteComment = (commentId) =>
  axios.delete(`${authInfo.mainUrl}/api/v1/social/comments/${commentId}`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
