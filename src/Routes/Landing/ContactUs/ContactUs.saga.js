import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './ContactUs.actions';
import * as constants from './ContactUsConstants';
import * as api from './api';

function* fetchContactUs() {
  try {
    const response = yield api.getContactUs();
    yield store.dispatch(actions.storeContactUs(response.contact_us));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* ContactUsSagas() {
  yield [
    fork(takeLatest, constants.GET_CONTACT_US, fetchContactUs),
  ];
}
