import axios from 'axios';
import { authInfo } from '../../utils/config';

// axios.interceptors.request.use(
//   config => {
//     config.headers.Authorization = localStorage.getItem('shopkick-accessToken-remember');
//     return config;
//   },
//   error => Promise.reject(error),
// );


export const loginUser = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/sessions`, payload)
    .then(res => res.data);

// export const resetPwd = email =>
//   axios.post('/v1/users/forgotpwd', { email })
//     .then(res => res.data);

// export const logout = user_id =>
//   axios.post('/v1/users/logout', { user_id })
//     .then(res => res.data);

// export const getUserDetails = userId =>
//   axios.get(`/v1/users/${userId}`)
//     .then(res => res.data);
