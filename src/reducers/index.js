import { combineReducers } from 'redux';
import messageAlertReducer from '../containers/MessageAlert/MessageAlert.reducer';
import loaderReducer from '../containers/Loader/Loader.reducer';
import loginReducer from '../Routes/Landing/Login/Login.reducer';
import LandingReducer from '../Routes/Landing/Landing.reducer';
import homeReducer from '../Routes/Home/Home.reducer';

export default function createReducer(asyncReducers) {
  const appReducer = combineReducers({
    messageAlert: messageAlertReducer,
    loader: loaderReducer,
    login: loginReducer,
    landing: LandingReducer,
    home: homeReducer,
    ...asyncReducers,
  });

  return (state, action) => appReducer(state, action);
}
