import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Gets the current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile =
  (profileFields, history, edit = false) =>
  async (dispatch) => {
    try {
      const res = await axios.post('/api/profile', profileFields);

      // Dispatch
      dispatch({ type: GET_PROFILE, payload: res.data });

      // Send an alert!
      dispatch(
        setAlert(edit ? 'Profile updated!' : 'Profile created!', 'success')
      );

      // Redirect the user if profile was created--not updated
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      const validationErrors = err.response.data.errors;
      if (validationErrors) {
        validationErrors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger'))
        );
      }
    }
  };
