import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getFollowers = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/social/followers`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
