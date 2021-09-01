import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function auth (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      }

    case AUTH_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }

    case REGISTER_SUCCESS:
      localStorage.getItem('token');

      return {
        ...state,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }

    default:
      return { ...state };
  }
}