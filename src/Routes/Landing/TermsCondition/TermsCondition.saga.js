import { fork, takeLatest } from 'redux-saga/effects';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './TermsCondition.actions';
import * as constants from './TermsConditionConstants';
import * as api from './api';

function* fetchTermsCondition() {
  try {
    const response = yield api.getTermsCondition();
    yield store.dispatch(actions.storeTermsCondition(response.terms_condition));
  } catch (e) {
    ShowAlert(e);
  }
}

export default function* TermsConditionSagas() {
  yield [
    fork(takeLatest, constants.GET_TERMS_CONDITION, fetchTermsCondition),
  ];
}
