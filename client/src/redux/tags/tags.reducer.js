import {
    GET_TAGS,
    TAG_ERROR
} from './tags.types';

const initialState = {
    tags: [],
    tag: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TAGS:
            return{
                ...state,
                tags: action.payload,
                loading: false
            };
        case TAG_ERROR:
            return{
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}