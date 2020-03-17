import axios from 'axios';
import { authInfo } from '../../utils/config';

export const doComment = (payload) =>
  axios.post(`${authInfo.mainUrl}/api/v1/social/comments`, payload, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
