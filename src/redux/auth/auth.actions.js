import axios from 'axios';

import config from "../../config";
import setAuthToken from './auth.utils';
import {setAlert} from '../alert/alert.actions';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './auth.types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(config.BASE_URL + `/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({username, password}) => async (dispatch) => {
  const config_headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({username, password});

  try {
    const res = await axios.post(config.BASE_URL + `/api/users`, body, config_headers);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = ({username, password}) => async (dispatch) => {
  const config_headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({username, password});

  try {
    const res = await axios.post(config.BASE_URL + `/api/auth`, body, config_headers);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });

    dispatch(setAlert(res.data.message, 'success'));

    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch(setAlert('User has logged out', 'success'));
  localStorage.removeItem('token');

  dispatch({type: LOGOUT});
};
