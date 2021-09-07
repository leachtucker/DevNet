import {
  GET_PROFILE,
  CREATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  REMOVE_EXPERIENCE,
  REMOVE_EDUCATION,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID,
  GET_GITHUB_REPOS,
  CLEAR_REPOS
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
    case GET_PROFILE_BY_ID:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case GET_GITHUB_REPOS:
      return {
        ...state,
        repos: payload,
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

    case CLEAR_REPOS:
      return {
        ...state,
        repos: []
      };

    default:
      return { ...state };
  }
}
