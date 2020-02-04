import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getFollowing = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/social/following`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
