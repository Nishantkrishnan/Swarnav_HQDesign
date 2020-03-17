import { fromJS } from 'immutable';
import { createReducerFromObject } from '../../utils/reducerUtils';
import { STORE_TERMS_CONDITION } from './TermsCondition/TermsConditionConstants';
import { STORE_ABOUT_US } from './AboutUs/AboutUsConstants';
import { STORE_CONTACT_US } from './ContactUs/ContactUsConstants';

export const initialState = fromJS({
  termsCondition: null,
  aboutUs: null,
  contactUs: null,
});

const reducerFunctions = {
  [STORE_TERMS_CONDITION]: (state, payload) =>
    state.set('termsCondition', fromJS(payload.response)),
  [STORE_ABOUT_US]: (state, payload) =>
    state.set('aboutUs', fromJS(payload.response)),
  [STORE_CONTACT_US]: (state, payload) =>
    state.set('contactUs', fromJS(payload.response)),
};

const LandingReducer = createReducerFromObject(reducerFunctions, initialState);
export default LandingReducer;
