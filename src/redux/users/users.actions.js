import axios from 'axios';

import config from "../../config";
import {GET_USERS, GET_USER, USER_ERROR} from './users.types';

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + '/api/users');
    dispatch({
      type: GET_USERS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

// Get user
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(config.BASE_URL + `/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
