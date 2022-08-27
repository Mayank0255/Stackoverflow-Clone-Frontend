import axios from 'axios';

import {
  allPostsData as _allPostsData,
  singlePostData as _singlePostData,
  allTopPostsData as _allTopPostsData,
  allTagPostsData as _allTagPostsData,
  createSinglePost as _createSinglePost,
  deleteSinglePost as _deleteSinglePost
} from './urls';

export const allPostsData = () => {
  return axios.get(_allPostsData);
}

export const singlePostData = (id) => {
  return axios.get(_singlePostData.replace('{id}', id));
}

export const allTopPostsData = () => {
  return axios.get(_allTopPostsData);
}

export const allTagPostsData = (tagName) => {
  return axios.get(_allTagPostsData.replace('{tagName}', tagName));
}

export const createSinglePost = (formData) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(_createSinglePost, formData, config_headers);
}

export const deleteSinglePost = (id) => {
  return axios.delete(_deleteSinglePost.replace('{id}', id));
}