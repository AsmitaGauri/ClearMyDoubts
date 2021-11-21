import {
  createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducers from './rootReducers';

const configureStore = () => {
  const persistConfig = {
    key: 'persistedReducer',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);

  const middlewares = [thunk, logger];
  const composeEnhancers = compose;
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  return store;
};

const store = configureStore();
const persistor = persistStore(store);

export { store, persistor };
