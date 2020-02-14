import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getAllFacilities = (locationId) =>
  axios.get(`${authInfo.mainUrl}/api/v1/locations/${locationId}/facilities/`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);

export const showFacility = facilityId =>
  axios.get(`${authInfo.mainUrl}/api/v1/facilities/`, { facilityId }, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
