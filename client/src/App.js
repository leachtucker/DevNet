import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';

// Redux //
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';

// Utils //
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Landing from './components/layout/Landing';

// Setup //
if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  useEffect(() => {
    // Check that user is authenticated on every mount/render of app
    store.dispatch(loadUser());
  }, []);

  // @TODO: Replace all connect HOC's with useDispatch/useSelector hooks

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
