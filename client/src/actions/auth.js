import axios from 'axios';
import { setAlert } from './alert';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  PROFILE_ERROR
} from './types';

import setAuthToken from '../utils/setAuthToken';

// Register
export const register =
  ({ name, email, password, password2 }) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/users', {
        name,
        email,
        password,
        password2
      });

      // Set token to local storage. Send token in dispatch as payload
      localStorage.setItem('token', res.data.token);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });

      // Reload user
      dispatch(loadUser());

      // Send an alert!
      dispatch(setAlert('Successfully registered!', 'success'));
    } catch (err) {
      dispatch({ type: REGISTER_FAIL });

      const validationErrors = err.response.data.errors;

      if (validationErrors) {
        validationErrors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger'))
        );
      } else {
        dispatch(setAlert("Uh oh! There's been an error on our end."));
      }
    }
  };

// Login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
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

      const validationErrors = err.response.data.errors;

      // Send alerts
      if (validationErrors) {
        validationErrors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger'))
        );
      } else {
        dispatch(setAlert("Uh oh! There's been an error on our end."));
      }
    }
  };

// Load user
export const loadUser = () => async (dispatch) => {
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
    const validationErrors = err.response.data.errors;
    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }
  }
};

// Logout
export const logout = () => async (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('token');

  // Remove token from axios headers
  setAuthToken();

  // Clear state
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });

  // Send an alert!
  dispatch(setAlert('Logged out!', 'success'));
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure you want to do that?')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });

      // Remove auth token from local storage
      localStorage.removeItem('token');

      dispatch(setAlert('Account removed!'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
