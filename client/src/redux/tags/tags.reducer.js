import {GET_TAG, GET_TAGS, TAG_ERROR} from './tags.types';

const initialState = {
  tags: [],
  tag: null,
  loading: true,
  redirect: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TAG:
      return {
        ...state,
        tag: action.payload,
        loading: false,
        redirect: false,
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload,
        loading: false,
        redirect: false,
      };
    case TAG_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        redirect: true,
      };
    default:
      return state;
  }
}
