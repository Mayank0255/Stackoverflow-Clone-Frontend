import {
    GET_USERS,
    USER_ERROR
} from "../types";

import axios from "axios";

// Get users
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};