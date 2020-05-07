import {
    GET_COMMENTS,
    COMMENT_ERROR,
    ADD_COMMENT,
    DELETE_COMMENT
} from "../types";

import axios from "axios";
import {setAlert} from "../alert/alert.actions";

export const getComments = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/comments/${id}`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add COMMENT
export const addComment = (postId,formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post(`/api/posts/comments/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete Comment
export const deleteComment = CommentId => async dispatch => {
    try {
        await axios.delete(`/api/posts/comments/${CommentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: CommentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};