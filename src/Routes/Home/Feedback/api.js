import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const sendFeedback = (payload) =>
  axios.post(`${authInfo.mainUrl}/api/v1/app_feedback`,  payload, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);