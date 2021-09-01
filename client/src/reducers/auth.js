import {
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function auth (state = initialState, action) {
  const { type } = action;

  switch (type) {
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