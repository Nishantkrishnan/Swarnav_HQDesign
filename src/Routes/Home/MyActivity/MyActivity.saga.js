import { fork, takeLatest } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './MyActivity.actions';
import * as constants from './MyActivityConstants';
import * as api from './api';

function* fetchMyActivity(payload) {
  try {
    const response = yield api.getMyActivity(payload.bookingType);
    yield store.dispatch(actions.storeMyActivity(response.data, payload.bookingType));
  } catch (e) {
    ShowAlert(e);
  }
}

function* cancelFacilityBooking({ payload }) {
  try {
    yield api.cancelFacilityBooking(payload.bookingId);
    yield store.dispatch(actions.fetchMyActivity('facilities'));
    store.dispatch(
      showMessageAlert({
        message: 'Successfully cancelled',
        visible: true,
        color: '#61d079',
      }),
    );
  } catch (e) {
    ShowAlert(e);
  }
}

function* cancelTicket({ payload }) {
  try {
    yield api.cancelTicket(payload.bookingId);
    yield store.dispatch(actions.fetchMyActivity('facilities'));
    store.dispatch(
      showMessageAlert({
        message: 'Successfully cancelled',
        visible: true,
        color: '#61d079',
      }),
    );
  } catch (e) {
    ShowAlert(e);
  }
}

function* cancelServiceRequest({ payload }) {
  try {
    yield api.cancelServiceRequest(payload.id);
    yield store.dispatch(actions.fetchMyActivity('services'));
    store.dispatch(
      showMessageAlert({
        message: 'Successfully cancelled',
        visible: true,
        color: '#61d079',
      }),
    );
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* MyActivitySagas() {
  yield [
    fork(takeLatest, constants.GET_MY_ACTIVITY, fetchMyActivity),
    fork(takeLatest, constants.CANCEL_FACILITY_BOOKING, cancelFacilityBooking),
    fork(takeLatest, constants.CANCEL_SERVICE_REQUEST, cancelServiceRequest),
    fork(takeLatest, constants.CANCEL_TICKET, cancelTicket),
  ];
}
