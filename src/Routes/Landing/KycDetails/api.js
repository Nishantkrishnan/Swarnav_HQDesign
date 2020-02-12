import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getKycUserDetailsApi = (token) =>
  axios.get(`${authInfo.mainUrl}/api/v1/kyc_details/${token}/edit`, { headers: {} })
    .then(res => res.data);

export const uploadKycUserDetailsApi = (token, formData) =>
  axios.put(`${authInfo.mainUrl}/api/v1/kyc_details/${token}`, formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(res => res.data);
