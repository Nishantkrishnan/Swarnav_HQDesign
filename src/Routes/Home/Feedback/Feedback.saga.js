import { replace } from 'react-router-redux';
import { fork, put, takeLatest } from 'redux-saga/effects';
import { showMessageAlert } from '../../../containers/MessageAlert/MessageAlert.actions';
import ShowAlert from '../../../containers/ShowAlert/ShowAlert';
import { store } from '../../../index';
import * as actions from './Feedback.actions';
import * as constants from './FeedbackConstant';
import * as api from './api';
// import { resetStore } from '../Home/NewCampaign/NewCampaign.actions';

function* sendFeedback({ payload }) {
  try {
    yield api.sendFeedback(payload);
    store.dispatch(
      showMessageAlert({
        message: 'Thanks for your feedback',
        visible: true,
        color: '#61d079',
      }),
    );
    store.dispatch(actions.showLoader(false));
    yield put(replace('/'));
  } catch (e) {
    store.dispatch(actions.showLoader(false));
    ShowAlert(e);
  }
}

export default function* FeedbackSagas() {
  yield [
    fork(takeLatest, constants.ACTION_SEND_FEEDBACK, sendFeedback),
  ];
}
