import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const fetchAvailableFacilityDates = payload =>
  // axios.get(`${authInfo.mainUrl}/api/v1/facilities/${payload.facilityId}/available_facility_dates/`,
  axios.get(`${authInfo.mainUrl}/api/v1/locations/${payload.currentLocationId}/facilities/${payload.facilityId}/available_facility_dates`,
    {
      params: {
        year: payload.year,
        month: payload.month,
      },
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const fetchAvailableFacilitySlots = payload =>
  axios.get(`${authInfo.mainUrl}/api/v1/locations/${payload.currentLocationId}/facilities/${payload.facilityId}/available_facility_slots/`,
    {
      params: {
        date: payload.date,
      },
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const createBookFacility = payload =>
  axios.post(`${authInfo.mainUrl}/api/v1/book_facilities`,
    payload,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const showFacility = facilityId =>
  axios.get(`${authInfo.mainUrl}/api/v1/facilities/`, { facilityId }, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
