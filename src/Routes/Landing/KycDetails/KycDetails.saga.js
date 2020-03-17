import { replace } from 'react-router-redux';
import { fork, takeLatest, put } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import { store } from '../../../index';
import * as actions from './KycDetails.actions';
import * as constants from './KycDetailsConstants';
import * as api from './api';

function* fetchUserKycDetails({ payload }) {

  try {
    const response = yield api.getKycUserDetailsApi(payload.token);
    yield store.dispatch(actions.storeKycUserDetails(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}

function* uploadUserKycDetails({ payload }) {
  console.log('KYC Details sagas.......................', payload.token, payload.formData);
  try {
    // store.dispatch(actions.showLoader(true));
    yield api.uploadKycUserDetailsApi(payload.token, payload.formData);
    yield store.dispatch(showMessageAlert({
      message: 'Thank you',
      visible: true,
      color: '#61d079',
    }));
    store.dispatch(actions.showLoader(false));
    yield put(replace('/'));
  } catch (e) {
    store.dispatch(actions.showLoader(false));
    ShowAlert(e);
  }
}

export default function* KycDetailsSagas() {
  yield [
    fork(takeLatest, constants.GET_USER_KYC_DETAILS, fetchUserKycDetails),
    fork(takeLatest, constants.UPLOAD_USER_KYC_DETAILS, uploadUserKycDetails),
  ];
}
