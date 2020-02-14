import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const loginUser = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/sessions`, payload)
    .then(res => res.data);

