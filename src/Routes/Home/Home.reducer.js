import { fromJS } from 'immutable';
import { createReducerFromObject } from '../../utils/reducerUtils';
import SHOW_LOADER from './HomeConstants';
import {
  STORE_FACILITIES,
} from './Facilities/FacilitiesConstants';
import {
  STORE_SERVICES,
  STORE_SERVICE_REQUEST_CONDITION,
  RESET_SERVICE_REQUEST_CONDITION,
} from './Services/ServicesConstants';
import {
  STORE_PROFILE,
} from './Profile/ProfileConstants';
import {
  STORE_FACILITY_MONTHS,
  STORE_FACILITY_DAYS,
  STORE_FACILITY_SLOTS,
} from './BookFacility/BookFacilityConstants';
import {
  STORE_MY_ACTIVITY,
} from './MyActivity/MyActivityConstants';
import { RESET_STORE } from '../Landing/Login/LoginPageConstants';
import {
  STORE_SERVICE_REQUEST_PREFERENCE,
} from './BookService/BookServiceConstants';
import {
  STORE_POSTS,
  UPDATE_LIKE_COUNT,
  UPDATE_COMMENTS_STORE,
  STORE_UPDATED_POST,
} from './Dashboard/Dashboard.constants';
import {
  STORE_USER_PROFILE,
  UPDATE_USER_PROFILE_CONNECTION,
} from './UserProfile/UserProfileConstants';
import {
  STORE_FOLLOWING,
} from './Following/FollowingConstants';
import {
  STORE_FOLLOWERS,
} from './Followers/FollowersConstants';

import { STORE_COMMENT } from '../../components/CommentForm/CommentForm.constants';
import { UPDATE_COMMENT_LIST } from '../../components/ManageComment/ManageComment.constants';
import { UPDATE_POST_LIST } from '../../components/ManagePost/ManagePost.constants';
import { STORE_LOCATIONS, CHANGE_CURRENT_LOCATION, BLOCK_AND_OPEN_LOCATION } from '../Home/Locations/LocationConstants';

export const initialState = fromJS({
  facilityTypes: null,
  serviceTypes: null,
  serviceRequestCondition: null,
  profile: null,
  bookFacility: null,
  myActivity: {
    facilities: [],
    services: [],
  },
  serviceRequestPreference: null,
  posts: null,
  hasMorePosts: true,
  pageCount: 1,
  following: null,
  followers: null,
  showLoader: false,
  locations: null,
  currentLocation: null,
  displayLocation: true,
});

const reducerFunctions = {
  [STORE_FACILITIES]: (state, payload) =>
    state.set('facilityTypes', fromJS(payload.response)),
  [STORE_SERVICES]: (state, payload) =>
    state.set('serviceTypes', fromJS(payload.response)),
  [STORE_SERVICE_REQUEST_CONDITION]: (state, payload) =>
    state.set('serviceRequestCondition', fromJS(payload.response)),
  [RESET_SERVICE_REQUEST_CONDITION]: state =>
    state.set('serviceRequestCondition', null),
  [STORE_SERVICE_REQUEST_PREFERENCE]: (state, payload) =>
    state.set('serviceRequestPreference', fromJS(payload.response)),
  [SHOW_LOADER]: (state, payload) =>
    state.set('showLoader', fromJS(payload.response)),
  [STORE_PROFILE]: (state, payload) => {

    return state.merge({
      profile: fromJS(payload.response),
      currentLocation: fromJS(payload.response.user.location),
    });
  },
  [STORE_USER_PROFILE]: (state, payload) =>
    state.set('userProfile', fromJS(payload.response)),
  [STORE_FOLLOWING]: (state, payload) =>
    state.set('following', fromJS(payload.response)),
  [STORE_FOLLOWERS]: (state, payload) =>
    state.set('followers', fromJS(payload.response)),
  [STORE_FACILITY_MONTHS]: (state, payload) =>
    state.set('bookFacility', fromJS({}).set('availableMonths', fromJS(payload.response))),
  [STORE_FACILITY_DAYS]: (state, payload) =>
    state.set('bookFacility', fromJS({}).set('availableDays', fromJS(payload.response))),
  [STORE_FACILITY_SLOTS]: (state, payload) =>
    state.set('bookFacility', fromJS({}).set('availableSlots', fromJS(payload.response))),
  [STORE_MY_ACTIVITY]: (state, payload) => {
    let newState;
    const bookingType = payload.bookingType;
    if (bookingType === 'services') {
      newState = state.setIn(['myActivity', 'services'], payload.response.service_requests);
    } else if (bookingType === 'facilities') {
      const BookFacilities = [];
      payload.response.facility_bookings.map((bookFacility, index) => {
        if (index === 0) {
          BookFacilities.push(Object.assign({}, bookFacility, { isOpen: true }));
        } else {
          BookFacilities.push(Object.assign({}, bookFacility, { isOpen: false }));
        }
      });
      newState = state.setIn(['myActivity', 'facilities'], fromJS(BookFacilities));
    }
    return newState;
  },
  [RESET_STORE]: state => state.merge({
    facilityTypes: null,
    serviceTypes: null,
    serviceRequestCondition: null,
    profile: null,
    bookFacility: null,
    myActivity: {
      facilities: [],
      services: [],
    },
    serviceRequestPreference: null,
    posts: null,
    hasMorePosts: true,
    pageCount: 1,
    following: null,
    followers: null,
    showLoader: false,
  }),
  [STORE_POSTS]: (state, payload) => {
    let newState;
    const pageCount = state.get('pageCount');
    if (state.get('posts') !== null && payload.page > 1) {
      newState = state.updateIn(['posts', 'user_posts'], (arr) => {
        return fromJS(arr.concat(fromJS(payload.response.user_posts)));
      });

      if (payload.response.user_posts.length > 0) {
        newState = newState.set('pageCount', (pageCount + 1));
      }
    } else if (state.get('posts') !== null && payload.page === 0) {
      newState = state.updateIn(['posts', 'user_posts'], (arr) => {
        return fromJS(arr.unshift(fromJS(payload.response.user_posts[0])));
      });
    } else {
      newState = state.merge({
        posts: fromJS(payload.response),
        hasMorePosts: true,
        pageCount: pageCount + 1,
      });
    }

    // if (state.get('posts') !== null && pageCount > 1) {
    //   newState = state.updateIn(['posts', 'user_posts'], (arr) => {
    //     return fromJS(arr.concat(fromJS(payload.response.user_posts)));
    //   });

    //   if (payload.response.user_posts.length > 0) {
    //     newState = newState.set('pageCount', (pageCount + 1));
    //   }
    // } else {
    //   newState = state.merge({
    //     posts: fromJS(payload.response),
    //     hasMorePosts: true,
    //     pageCount: pageCount + 1,
    //   });
    // }

    if (payload.response.user_posts.length === 0) {
      newState = state.set('hasMorePosts', false);
    }

    return fromJS(newState);
  },

  [UPDATE_LIKE_COUNT]: (state, payload) => {
    const response = payload.response;
    const postsIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === response.post_id);
    });
    return state.setIn(['posts', 'user_posts', postsIndex, 'likes', 'likes_count'], response.likes_count);
  },

  [STORE_UPDATED_POST]: (state, payload) => {
    const response = payload.response;
    const postsIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === response.post_id);
    });
    return state.setIn(['posts', 'user_posts', postsIndex], fromJS(response));
  },

  [UPDATE_COMMENTS_STORE]: (state, payload) => {
    const postsIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === payload.postId);
    });
    const newState = state.updateIn(['posts', 'user_posts', postsIndex, 'comments'], (comments) => {
      return fromJS({
        comments_count: payload.response.comments.comments_count,
        page_number: payload.response.comments.page_number,
        load_more: payload.response.comments.load_more,
        data: payload.response.comments.data.reverse().concat(comments.get('data').toJS()),
      });
    });

    return newState;
  },

  [STORE_COMMENT]: (state, payload) => {
    const postsIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === payload.postId);
    });
    const pageNumber = state.get('posts')
      .get('user_posts')
      .get(postsIndex)
      .get('comments')
      .get('page_number');
    const loadMore = state.get('posts')
      .get('user_posts')
      .get(postsIndex)
      .get('comments')
      .get('load_more');

    const newState = state.updateIn(['posts', 'user_posts', postsIndex, 'comments'], (comments) => {
      return fromJS({
        comments_count: payload.comment.comments_count,
        page_number: pageNumber,
        load_more: loadMore,
        data: comments.get('data').toJS().concat(payload.comment.data),
      });
    });

    return newState;
  },

  [UPDATE_COMMENT_LIST]: (state, payload) => {
    const postIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === payload.postId);
    });
    const commentIndex = state.get('posts')
      .get('user_posts')
      .get(postIndex)
      .get('comments')
      .get('data')
      .findIndex((comment) => {
        return (comment.get('comment_id') === payload.commentId);
      });

    const newState = state.updateIn(['posts', 'user_posts', postIndex, 'comments'], (comments) => {
      const updatedCommentList = comments.get('data').toJS();
      updatedCommentList.splice(commentIndex, 1);
      return fromJS({
        comments_count: payload.commentCount,
        data: updatedCommentList,
      });
    });

    return newState;
  },

  [UPDATE_USER_PROFILE_CONNECTION]: (state, payload) =>
    state.setIn(['userProfile', 'following'], payload.following),

  [UPDATE_POST_LIST]: (state, payload) => {
    const postIndex = state.get('posts').get('user_posts').findIndex((post) => {
      return (post.get('post_id') === payload.postId);
    });

    const newState = state.updateIn(['posts', 'user_posts'], (posts) => {
      return posts.splice(postIndex, 1);
    });
    return newState;
  },
  [STORE_LOCATIONS]: (state, payload) => {
    const userProfile = state.get('profile');
    let defaultLocation = null;
    if (userProfile && userProfile.user && userProfile.user.location) {
      defaultLocation = userProfile.user.location;
    }
    let currentLocation = state.get('currentLocation');
     if (currentLocation == null) {
      if (defaultLocation == null) {
        currentLocation = fromJS(payload[0]);
      } else {
        currentLocation = defaultLocation;
      }
     }

    return state.merge({
      locations: fromJS(payload),
      currentLocation: currentLocation,
    });
  },
  [CHANGE_CURRENT_LOCATION]: (state, payload) =>
    state.set('currentLocation', fromJS(payload)),
  [BLOCK_AND_OPEN_LOCATION]: (state, payload) =>
    state.set('displayLocation', fromJS(payload)),
};

const homeReducer = createReducerFromObject(reducerFunctions, initialState);
export default homeReducer;
