import { fromJS } from 'immutable';
import { ACTION_INCREMENT_LOADER_COUNT, ACTION_DECREMENT_LOADER_COUNT } from './Loader.constants';
import { ACTION_LOGIN_ERROR } from '../../Routes/Landing/Login/LoginPageConstants';
import { createReducerFromObject } from '../../utils/reducerUtils';

const initialState = fromJS({
  count: 0,
});

export const reducerFunctions = {
  [ACTION_INCREMENT_LOADER_COUNT]: state => state.set('count', state.get('count') + 1),
  [ACTION_DECREMENT_LOADER_COUNT]: state => state.set('count', state.get('count') - 1),
  [ACTION_LOGIN_ERROR]: state => state.set('count', state.get('count') - 1),
};

const loaderReducer = createReducerFromObject(reducerFunctions, initialState);

export default loaderReducer;
