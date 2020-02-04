import { replace } from 'react-router-redux';
import { fork, takeLatest, put } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './BookService.actions';
import * as constants from './BookServiceConstants';
import { resetServiceRequestCondition } from '../Services/Services.actions';
import * as api from './api';

function* serviceRequestPreferences(payload) {
  try {
    const response = yield api.serviceRequestPreferences(payload.payload);
    yield store.dispatch(actions.storeServiceRequestPreferences(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}


function* createServiceBooking(payload) {
  try {
    const response = yield api.createServiceBooking(payload);
    yield store.dispatch(resetServiceRequestCondition());
    store.dispatch(
      showMessageAlert({
        message: response.message,
        visible: true,
        color: '#61d079',
      }),
    );
    store.dispatch(actions.showLoader(false));
    yield put(replace('/my_bookings/services'));
  } catch (e) {
    store.dispatch(actions.showLoader(false));
    ShowAlert(e);
  }
}

export default function* BookServiceSagas() {
  yield [
    fork(takeLatest, constants.SERVICE_REQUEST_PREFERENCE, serviceRequestPreferences),
    fork(takeLatest, constants.CREATE_SERVICE_BOOKING, createServiceBooking),
  ];
}
