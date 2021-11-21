import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import StackNavigator from './routes/StackNavigator';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StackNavigator />
    </PersistGate>
  </Provider>
);

export default App;
