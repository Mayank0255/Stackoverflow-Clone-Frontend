import {
    GET_ANSWERS,
    ANSWER_ERROR,
    ADD_ANSWER,
    DELETE_ANSWER
} from "../types";

import axios from "axios";
import {setAlert} from "../alert/alert.actions";

export const getAnswers = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/answers/${id}`);

        dispatch({
            type: GET_ANSWERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Answer
export const addAnswer = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/answers/${postId}`, formData, config);

        dispatch({
            type: ADD_ANSWER,
            payload: res.data
        });

        dispatch(setAlert('Answer Added', 'success'));
    } catch (err) {
        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Answer
export const deleteAnswer = AnswerId => async dispatch => {
    try {
        await axios.delete(`/api/posts/answers/${AnswerId}`);

        dispatch({
            type: DELETE_ANSWER,
            payload: AnswerId
        });

        dispatch(setAlert('Answer Removed', 'success'));
    } catch (err) {
        dispatch({
            type: ANSWER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};