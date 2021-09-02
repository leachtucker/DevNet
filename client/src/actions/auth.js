import axios from 'axios';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "./types";

import setAuthToken from '../utils/setAuthToken';

// Register
export const register = ({ name, email, password, password2 }) => async dispatch => {
  try {
    const res = await axios.post('/api/users', { name, email, password, password2 });

    // Set token to local storage. Send token in dispatch as payload
    localStorage.setItem('token', res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });

    // Reload user
    dispatch(loadUser());

    // Send an alert!
    dispatch(setAlert('Successfully registered!', 'success'));
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert("Uh oh! There's been an error on our end."));
    }
  }
};

// Login user
export const login = ({ email, password }) => async dispatch => {
  try {
    const res = await axios.post('/api/auth', { email, password });

    // Set token to local storage. Send token in dispatch as payload
    localStorage.setItem('token', res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });

    // Reload user
    dispatch(loadUser());

    // Send an alert!
    dispatch(setAlert('Successfully logged in!', 'success'));
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });

    const errors = err.response.data.errors;

    // Send alerts
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert("Uh oh! There's been an error on our end."));
    }
  }
};

// Load user
export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({ type: AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    console.error(err);

    // Auth failed--let's remove the token from local storage
    localStorage.removeItem('token');

    dispatch({ type: AUTH_FAIL });

    // Send alerts
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Logout
export const logout = () => async dispatch => {
  // Remove token from local storage
  localStorage.removeItem('token');

  // Remove token from axios headers
  setAuthToken();

  // Clear state
  dispatch({ type: LOGOUT });

  // Send an alert!
  dispatch(setAlert('Logged out!', 'success'));
};