import {
  GET_PROFILE,
  CREATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  REMOVE_EXPERIENCE,
  REMOVE_EDUCATION
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_EDUCATION:
    case REMOVE_EXPERIENCE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        error: {}
      };

    default:
      return { ...state };
  }
}
