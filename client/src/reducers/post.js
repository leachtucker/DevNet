import {
  CLEAR_POST,
  CREATE_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POSTS,
  GET_POST_BY_ID,
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

    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        loading: false
      };

    case CLEAR_POST:
      return {
        ...state,
        post: null,
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
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === payload.id) return { ...post, likes: payload.likes };
          return post;
        }),
        loading: false
      };

    case CREATE_COMMENT:
    case DELETE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };

    default:
      return {
        ...state
      };
  }
}
