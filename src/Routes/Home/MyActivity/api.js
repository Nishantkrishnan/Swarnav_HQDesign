import axios from 'axios';
import { authInfo } from '../../../utils/config';

export const getMyActivity = bookingType =>
  axios.get(`${authInfo.mainUrl}/api/v1/activity`, {
    headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    params: { type: bookingType },
  }).then(res => res.data);

export const cancelFacilityBooking = bookingId =>
  axios.delete(`${authInfo.mainUrl}/api/v1/book_facilities/cancel_booking/${bookingId}`,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const cancelTicket = bookingId =>
  axios.delete(`${authInfo.mainUrl}/api/v1/book_facilities/cancel_all_bookings/${bookingId}`,
    {
      headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') },
    }).then(res => res.data);

export const cancelServiceRequest = id =>
  axios.delete(`${authInfo.mainUrl}/api/v1/service_requests/${id}`, { headers: { 'X-Auth-Token': localStorage.getItem('coworks-accessToken-remember') } })
    .then(res => res.data);
