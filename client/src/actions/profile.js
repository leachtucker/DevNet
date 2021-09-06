import axios from 'axios';
import { setAlert } from './alert';

import {
  CREATE_PROFILE,
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_ERROR,
  REMOVE_EDUCATION,
  REMOVE_EXPERIENCE,
  UPDATE_PROFILE,
  GET_PROFILE_BY_ID,
  CLEAR_PROFILE,
  GET_GITHUB_REPOS
} from './types';

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

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');

    dispatch({ type: GET_ALL_PROFILES, payload: res.data });
  } catch (err) {
    console.error(err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a profile by user ID
export const getProfileByID = (userID) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/profile/${userID}`);

    dispatch({ type: GET_PROFILE_BY_ID, payload: res.data });
  } catch (err) {
    console.error(err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get GitHub repos
export const getGitHubRepos = (github_username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${github_username}`);

    dispatch({ type: GET_GITHUB_REPOS, payload: res.data });
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
      dispatch({ type: CREATE_PROFILE, payload: res.data });

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

// Add experience to profile
export const addExperience =
  (experienceFields, history) => async (dispatch) => {
    try {
      const res = await axios.put('/api/profile/experience', experienceFields);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });

      dispatch(setAlert('Experience added!', 'success'));

      // Redirect user back to dashboard upon successfully adding experience
      history.push('/dashboard');
    } catch (err) {
      console.error(err);

      const validationErrors = err.response.data.errors;

      if (validationErrors) {
        validationErrors.forEach((error) =>
          dispatch(setAlert(error.msg, 'danger'))
        );
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Add education to profile
export const addEducation = (educationFields, history) => async (dispatch) => {
  try {
    const res = await axios.put('/api/profile/education', educationFields);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education added!', 'success'));

    // Redirect user back to dashboard upon successfully adding education to profile
    history.push('/dashboard');
  } catch (err) {
    console.error(err);

    const validationErrors = err.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove experience from profile
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: REMOVE_EXPERIENCE, payload: res.data });

    dispatch(setAlert('Experience removed!'));
  } catch (err) {
    console.error(err);

    const validationErrors = err.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove education from profile
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: REMOVE_EDUCATION, payload: res.data });

    dispatch(setAlert('Education removed!'));
  } catch (err) {
    console.error(err);

    const validationErrors = err.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
