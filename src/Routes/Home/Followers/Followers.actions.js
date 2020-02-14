import {
  GET_FOLLOWERS,
  STORE_FOLLOWERS,
} from './FollowersConstants';

export function fetchFollowers() {
  return {
    type: GET_FOLLOWERS,
  };
}

export function storeFollowers(response) {
  return {
    type: STORE_FOLLOWERS,
    payload: { response },
  };
}
