import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Redux //
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Utils //
import setAuthToken from './utils/setAuthToken';

import './App.css';

// Setup //
if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    // Check that user is authenticated on every mount/render of app
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
