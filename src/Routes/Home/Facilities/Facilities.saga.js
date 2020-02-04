import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Facilities.actions';
import * as constants from './FacilitiesConstants';
import * as api from './api';

function* getFacilities({ payload }) {
  try {
    const response = yield api.getAllFacilities(payload);
    yield store.dispatch(actions.storeFacilities(response.data.facilities_types));
  } catch (e) {
    // ShowAlert(e);
  }
}

export default function* FacilitiesSagas() {
  yield [
    fork(takeLatest, constants.GET_FACILITIES, getFacilities),
  ];
}
