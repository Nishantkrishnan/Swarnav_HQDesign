import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getContactUs = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/pages/contact_us`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
