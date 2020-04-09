import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../types';

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
}