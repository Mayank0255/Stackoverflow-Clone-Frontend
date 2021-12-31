import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';
import setAuthToken from './redux/auth/auth.utils';
import {loadUser} from './redux/auth/auth.actions';
import RoutesTree from './RoutesTree';

import Header from './components/Header/Header.component';
import Alert from './components/Alert/Alert.component';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Alert />
        <RoutesTree />
      </div>
    </Provider>
  );
};

export default App;
