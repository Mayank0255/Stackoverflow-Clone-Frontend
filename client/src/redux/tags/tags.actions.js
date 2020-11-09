import {
    GET_TAG,
    GET_TAGS,
    TAG_ERROR
} from './tags.types';
import axios from 'axios';
import {setAlert} from "../alert/alert.actions";

export const getTag = tagName => async dispatch => {
    try {
        const res = await axios.get(`/api/tags/${tagName}`);

        console.log(res.data);
        dispatch({
            type: GET_TAG,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: TAG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getTags = () => async dispatch => {
    try {
        const res = await axios.get('/api/tags');

        dispatch({
            type: GET_TAGS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: TAG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};