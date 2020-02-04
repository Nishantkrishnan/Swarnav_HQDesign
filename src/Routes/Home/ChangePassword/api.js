import axios from 'axios';
import { authInfo } from '../../../utils/config';


export const updatePassword = (payload) =>
  axios.put(`${authInfo.mainUrl}/api/v1/passwords/change_password`,  payload, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
