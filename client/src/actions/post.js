import axios from 'axios';
import { setAlert } from './alert';

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

// Gets a post by ID
export const getPostByID = (post_id) => async (dispatch) => {
  dispatch({ type: CLEAR_POST });

  try {
    const res = await axios.get(`/api/posts/${post_id}`);

    dispatch({ type: GET_POST_BY_ID, payload: res.data });
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Creates a post
export const createPost = (postFields) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', postFields);

    dispatch({ type: CREATE_POST, payload: res.data });

    dispatch(setAlert('Post created!', 'success'));
  } catch (err) {
    console.error(err);

    const validationErrors = err.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

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

// Comments on a post
export const createComment = (post_id, commentFields) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/posts/comment/${post_id}`,
      commentFields
    );

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.error(err);

    const validationErrors = err.response.data.errors;

    if (validationErrors) {
      validationErrors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger'))
      );
    }

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Deletes a comment from  a post
export const deleteComment = (post_id, comment_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/posts/comment/${post_id}/${comment_id}`
    );

    dispatch({
      type: DELETE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.error(err);

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
