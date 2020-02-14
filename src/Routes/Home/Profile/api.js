import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getProfile = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/profiles/`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const updateProfileImg = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/profiles/update_profile_image`,
    payload,
    {
      headers: {
        'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember'),
        'content-type': 'multipart/form-data',
      },
    })
    .then(res => res.data);
