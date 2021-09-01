import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import { setAlert } from './alert';

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