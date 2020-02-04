import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getAllLocations = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/locations`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);