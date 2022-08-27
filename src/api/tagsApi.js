import axios from 'axios';

import { allTagsData as _allTagsData, singleTagData as _singleTagData } from './urls';

export const allTagsData = () => {
  return axios.get(_allTagsData);
}

export const singleTagData = (tagName) => {
  return axios.get(_singleTagData.replace('{tagName}', tagName));
}