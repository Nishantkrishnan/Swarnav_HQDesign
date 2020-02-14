import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import loginSagas from '../Routes/Landing/Login/LoginPage.saga';
import ServicesSagas from '../Routes/Home/Services/Services.saga';
import FacilitiesSagas from '../Routes/Home/Facilities/Facilities.saga';
import dashboardSagas from '../Routes/Home/Dashboard/Dashboard.saga';
import ProfileSagas from '../Routes/Home/Profile/Profile.saga';
import AboutUsSagas from '../Routes/Landing/AboutUs/AboutUs.saga';
import ContactUsSagas from '../Routes/Landing/ContactUs/ContactUs.saga';
import TermsConditionSagas from '../Routes/Landing/TermsCondition/TermsCondition.saga';
import FacilityDatesSagas from '../Routes/Home/BookFacility/BookFacility.saga';
import BookServiceSagas from '../Routes/Home/BookService/BookService.saga';
import changePasswordSagas from '../Routes/Home/ChangePassword/ChangePassword.saga';
import MyActivitySagas from '../Routes/Home/MyActivity/MyActivity.saga';
import FeedbackSagas from '../Routes/Home/Feedback/Feedback.saga';
import CommentFormSagas from '../components/CommentForm/CommentForm.saga';
import ManageCommentSagasa from '../components/ManageComment/ManageComment.saga';
import UserProfileSagasa from '../Routes/Home/UserProfile/UserProfile.saga';
import FollowingSagasa from '../Routes/Home/Following/Following.saga';
import FollowersSagasa from '../Routes/Home/Followers/Followers.saga';
import UpdateProfileSagas from '../Routes/Home/UpdateProfile/UpdateProfile.saga';
import ManagePostSagas from '../components/ManagePost/ManagePostsaga';
import LocationsSagas from '../Routes/Home/Locations/Location.saga';
// import newCampaignSagas from '../Routes/Home/NewCampaign/NewCampaign.saga';
import rootReducer from '../reducers/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState, history) {
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(reduxImmutableStateInvariant());
  }

  // add support for Redux dev tools if not production build and devtools available
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
      typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // shouldHotReload: false
        deserializeState: state =>
          Object.keys(state).reduce((previous, current) => {
            previous[current] = fromJS(state[current]);
            return previous;
          }, {}),
      })
      : compose;

  const store = createStore(
    rootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(loginSagas);
  sagaMiddleware.run(dashboardSagas);
  sagaMiddleware.run(ServicesSagas);
  sagaMiddleware.run(BookServiceSagas);
  sagaMiddleware.run(FacilitiesSagas);
  sagaMiddleware.run(FacilityDatesSagas);
  sagaMiddleware.run(ProfileSagas);
  sagaMiddleware.run(AboutUsSagas);
  sagaMiddleware.run(ContactUsSagas);
  sagaMiddleware.run(TermsConditionSagas);
  sagaMiddleware.run(changePasswordSagas);
  sagaMiddleware.run(MyActivitySagas);
  sagaMiddleware.run(FeedbackSagas);
  sagaMiddleware.run(CommentFormSagas);
  sagaMiddleware.run(ManageCommentSagasa);
  sagaMiddleware.run(UserProfileSagasa);
  sagaMiddleware.run(FollowingSagasa);
  sagaMiddleware.run(FollowersSagasa);
  sagaMiddleware.run(UpdateProfileSagas);
  sagaMiddleware.run(ManagePostSagas);
  sagaMiddleware.run(LocationsSagas);
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {};
  return store;
}

export default configureStore;
