import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function auth (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      }

    case AUTH_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        loading: false
      }

    default:
      return { ...state };
  }
}