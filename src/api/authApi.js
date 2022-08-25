import axios from 'axios';

import {loadUserData as _loadUserData, registerUser as _registerUser, loginUser as _loginUser} from './urls';

export const loadUserData = () => {
  return axios.get(_loadUserData);
};

export const registerUser = (username, password) => {
  const config_headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  return axios.post(_registerUser, body, config_headers);
};

export const loginUser = (username, password) => {
  const config_headers = {
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({username, password});

  return axios.post(_loginUser, body, config_headers);
};