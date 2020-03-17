import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Locations.actions';
import * as constants from './LocationConstants';
import * as api from './api';

function* fetchLocationsSaga() {
  try {
    const response = yield api.getAllLocations();
    yield store.dispatch(actions.storeLocations(response.data));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* LocationsSagas() {
  yield [
    fork(takeLatest, constants.GET_LOCATIONS, fetchLocationsSaga),
  ];
}
