import axios from 'axios';
import { authInfo } from '../../../utils/config';


export const updateProfile = (payload) =>
  axios.post(`${authInfo.mainUrl}/api/v1/profiles`,  payload, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);