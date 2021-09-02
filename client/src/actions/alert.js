import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert =
  (msg, alertType, duration = 5000) =>
  (dispatch) => {
    const id = uuid();

    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
    });

    // Remove alert after 5seconds
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), duration);
  };
