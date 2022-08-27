import {setAlert} from '../alert/alert.actions';
import {GET_TAG, GET_TAGS, TAG_ERROR} from './tags.types';
import { allTagsData, singleTagData } from '../../api/tagsApi';

export const getTag = (tagName) => async (dispatch) => {
  try {
    const res = await singleTagData(tagName);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await allTagsData();

    dispatch({
      type: GET_TAGS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'danger'));

    dispatch({
      type: TAG_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status},
    });
  }
};
