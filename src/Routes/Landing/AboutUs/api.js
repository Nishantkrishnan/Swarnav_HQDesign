import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getAboutUs = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/pages/about_us`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
