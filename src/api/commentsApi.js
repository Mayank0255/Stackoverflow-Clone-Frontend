import axios from 'axios';

import {
  allCommentsData as _allCommentsData,
  createSingleComment as _createSingleComment,
  deleteSingleComment as _deleteSingleComment
} from './urls';

export const allCommentsData = (id) => {
  return axios.get(_allCommentsData.replace('{id}', id));
}

export const createSingleComment = (postId, formData) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios.post(_createSingleComment.replace('{postId}', postId), formData, config_headers);
}

export const deleteSingleComment = (CommentId) => {
  return axios.delete(_deleteSingleComment.replace('{CommentId}', CommentId));
}