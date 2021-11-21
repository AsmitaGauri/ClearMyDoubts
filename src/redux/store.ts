import {
  createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from './rootReducers';
import { Auth } from '../interfaces';

const initialState = {
  auth: <Auth>{},
};

const configureStore = () => {
  const middlewares = [thunk, logger];
  const composeEnhancers = compose;
  const store = createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
};

const store = configureStore();

export default store;
