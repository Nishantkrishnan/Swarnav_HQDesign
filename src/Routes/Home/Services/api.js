import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getAllServices = (locationId) =>
  axios.get(`${authInfo.mainUrl}/api/v1/locations/${locationId}/services`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const checkServiceRequestCondition = (serviceId, currentLocationId) =>
  axios.post(`${authInfo.mainUrl}/api/v1/locations/${currentLocationId}/services/${serviceId}/check_services_request_conditions`,
    {},
    { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const showService = serviceId =>
  axios.get(`${authInfo.mainUrl}/api/v1/services/`, { serviceId }, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
