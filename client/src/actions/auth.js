import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, AUTH_SUCCESS, AUTH_FAIL } from "./types";
import { setAlert } from './alert';

import setAuthToken from '../utils/setAuthToken';

// Register
export const register = ({ name, email, password, password2 }) => async dispatch => {
  try {
    const res = await axios.post('/api/users', { name, email, password, password2 });

    localStorage.setItem('token', res.data.token);
    dispatch({ type: REGISTER_SUCCESS });

    dispatch(setAlert('Successfully registered!', 'success'));
  } catch (err) {
    localStorage.removeItem('token');
    dispatch({ type: REGISTER_FAIL });

    const errors = err.response.data.errors;

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

    dispatch({ type: AUTH_FAIL });

    localStorage.removeItem('token');

    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};