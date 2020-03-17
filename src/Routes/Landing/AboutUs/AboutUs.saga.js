import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './AboutUs.actions';
import * as constants from './AboutUsConstants';
import * as api from './api';

function* fetchAboutUs() {
  try {
    const response = yield api.getAboutUs();
    yield store.dispatch(actions.storeAboutUs(response.about_us));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* AboutUsSagas() {
  yield [
    fork(takeLatest, constants.GET_ABOUT_US, fetchAboutUs),
  ];
}
