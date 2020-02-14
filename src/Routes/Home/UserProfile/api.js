import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getUserProfile = (profileId) =>
  axios.get(`${authInfo.mainUrl}/api/v1/profiles/` + profileId, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const connectUserProfile = (profileId) =>
axios.post(`${authInfo.mainUrl}
/api/v1/social/follow/${profileId}`, {}, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const disconnectUserProfile = (profileId) =>
  axios.delete(`${authInfo.mainUrl}
  /api/v1/social/follow/${profileId}`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);    
