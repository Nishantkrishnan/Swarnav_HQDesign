import axios from 'axios';
import { authInfo } from '../../utils/config';


export const deletePost = (postId) =>
  axios.delete(`${authInfo.mainUrl}/api/v1/social/post/${postId}`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
