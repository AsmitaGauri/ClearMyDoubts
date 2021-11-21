import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import StackNavigator from './routes/StackNavigator';

const App = () => (
  <Provider store={store}>
    <StackNavigator />
  </Provider>
);

export default App;
