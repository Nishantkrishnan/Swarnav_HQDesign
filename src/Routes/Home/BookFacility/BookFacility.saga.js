import { replace } from 'react-router-redux';
import { fork, takeLatest, put } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './BookFacility.actions';
import * as constants from './BookFacilityConstants';
import * as api from './api';

function* fetchAvailableFacilityDates(payload) {
  try {
    const response = yield api.fetchAvailableFacilityDates(payload.payload);
    if (payload.payload.year === '') {
      yield store.dispatch(actions.storeAvailableMonths(response.data));
    } else {
      yield store.dispatch(actions.storeAvailableDays(response.data));
    }
  } catch (e) {
    ShowAlert(e);
  }
}

function* fetchAvailableFacilitySlots(payload) {
  try {
    const response = yield api.fetchAvailableFacilitySlots(payload.payload);
    yield store.dispatch(actions.storeAvailableSlots(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}

function* createBookFacility(payload) {
  try {
    const response = yield api.createBookFacility(payload.payload);
    store.dispatch(
      showMessageAlert({
        message: response.message,
        visible: true,
        color: '#61d079',
      }),
    );
    store.dispatch(actions.showLoader(false));
    yield put(replace('/my_bookings/facilities'));
  } catch (e) {
    store.dispatch(actions.showLoader(false));
    ShowAlert(e);
  }
}

export default function* FacilityDatesSagas() {
  yield [
    fork(takeLatest, constants.ACTION_FACILITY_MONTHS, fetchAvailableFacilityDates),
    fork(takeLatest, constants.ACTION_FACILITY_SLOTS, fetchAvailableFacilitySlots),
    fork(takeLatest, constants.ACTION_CREATE_BOOK_FACILITY, createBookFacility),
  ];
}
