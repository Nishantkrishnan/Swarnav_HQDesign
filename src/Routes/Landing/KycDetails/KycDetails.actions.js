import {
  GET_USER_KYC_DETAILS,
  STORE_USER_KYC_DETAILS,
  UPLOAD_USER_KYC_DETAILS,
} from './KycDetailsConstants';

import SHOW_LOADER from '../../Home/HomeConstants';

export function fetchUserKtcDetails(upLoadKycDetailsToken) {
  return {
    type: GET_USER_KYC_DETAILS,
    payload: { token: upLoadKycDetailsToken },
  };
}

export function storeKycUserDetails(response) {
  return {
    type: STORE_USER_KYC_DETAILS,
    payload: { response },
  };
}

export function uploadKycUserDetails(token, formData) {
  return {
    type: UPLOAD_USER_KYC_DETAILS,
    payload: { token, formData },
  };
}

export function showLoader(response) {
  return {
    type: SHOW_LOADER,
    payload: { response },
  };
}
