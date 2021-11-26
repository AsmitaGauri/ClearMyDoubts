import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import postReducer from './posts/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  posts: postReducer,
});

export default rootReducers;
