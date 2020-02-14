import { ACTION_SEND_FEEDBACK } from './FeedbackConstant';
import SHOW_LOADER from '../HomeConstants';

export function sendFeedback(title, description, location_id) {
  return {
    type: ACTION_SEND_FEEDBACK,
    payload: {
      title,
      description,
      location_id,
    },
  };
}

export function showLoader(response) {
  return {
    type: SHOW_LOADER,
    payload: { response },
  };
}
