import {
    GET_TAGS,
    TAG_ERROR
} from "../types";
import axios from "axios";

export const getTags = () => async dispatch => {
    try {
        const res = await axios.get('/api/tags');

        dispatch({
            type: GET_TAGS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TAG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};