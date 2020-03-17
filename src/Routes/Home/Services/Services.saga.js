import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Services.actions';
import * as constants from './ServicesConstants';
import * as api from './api';

function* fetchServices({ payload }) {
  try {
    const response = yield api.getAllServices(payload);
    yield store.dispatch(actions.storeServices(response.data.service_types));
  } catch (e) {
    ShowAlert(e);
  }
}

function* checkServiceCondition(payload) {
  try {
    yield api.checkServiceRequestCondition(payload.serviceId, payload.currentLocationId);
    yield store.dispatch(actions.storeServiceRequestCondition({ serviceId: payload.serviceId }));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* ServicesSagas() {
  yield [
    fork(takeLatest, constants.GET_SERVICES, fetchServices),
    fork(takeLatest, constants.CHECK_SERVICE_REQUEST_CONDITION, checkServiceCondition),
  ];
}
