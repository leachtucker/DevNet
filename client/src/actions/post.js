import axios from 'axios';
import { setAlert } from './alert';

import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  POST_ERROR,
  UNLIKE_POST
} from './types';

// Gets all posts from server
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Deletes a post
export const deletePost = (post_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${post_id}`);

    dispatch({ type: DELETE_POST, payload: post_id });

    dispatch(setAlert('Post deleted!'));
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Likes a post
export const likePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);

    dispatch({ type: LIKE_POST, payload: { id: post_id, likes: res.data } });
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Unlikes a post
export const unlikePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);

    dispatch({ type: UNLIKE_POST, payload: { id: post_id, likes: res.data } });
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
