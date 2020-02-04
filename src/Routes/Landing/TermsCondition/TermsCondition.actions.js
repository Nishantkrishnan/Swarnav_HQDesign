import {
  GET_TERMS_CONDITION,
  STORE_TERMS_CONDITION,
} from './TermsConditionConstants';

export function fetchTermsCondition() {
  return {
    type: GET_TERMS_CONDITION,
  };
}

export function storeTermsCondition(response) {
  return {
    type: STORE_TERMS_CONDITION,
    payload: { response },
  };
}
