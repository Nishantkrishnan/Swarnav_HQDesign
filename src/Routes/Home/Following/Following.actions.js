import {
  GET_FOLLOWING,
  STORE_FOLLOWING,
} from './FollowingConstants';

export function fetchFollowing() {
  return {
    type: GET_FOLLOWING,
  };
}

export function storeFollowing(response) {
  return {
    type: STORE_FOLLOWING,
    payload: { response },
  };
}
