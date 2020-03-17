import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getTermsCondition = () =>
  axios.get(`${authInfo.mainUrl}/api/v1/pages/terms_condition`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
