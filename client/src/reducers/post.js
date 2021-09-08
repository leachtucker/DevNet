import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  POST_ERROR,
  UNLIKE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function post(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) return { ...post, likes: payload.likes };
          return post;
        }),
        loading: false
      };

    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) return { ...post, likes: payload.likes };
          return post;
        }),
        loading: false
      };

    default:
      return {
        ...state
      };
  }
}
