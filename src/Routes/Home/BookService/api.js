import axios from 'axios';
import { authInfo } from '../../../utils/config';
export const serviceRequestPreferences = payload =>
  axios.get(`${authInfo.mainUrl}/api/v1/locations/${payload.currentLocationId}/services/${payload.serviceId}/service_request_preferences/`,
    {
      params: {
        date: payload.date,
      },
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const createServiceBooking = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/service_types/${payload.serviceTypeId}/services/${payload.serviceId}/service_requests`,
    payload.reqBody,
    {
      headers: {
        'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember'),
        'content-type': 'multipart/form-data',
      },
    }).then(res => res.data);
