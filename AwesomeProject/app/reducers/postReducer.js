import { FETCH_POSTS, LOGIN, DETAILS, TEST } from '../actions/types';

const initialState = {
    items: [],
    token: {}
};

function postReducer (state = initialState, action) {
    switch (action.type) {
    case FETCH_POSTS:
        return {
            ...state,
            items: action.payload
        };
        return state;
    case LOGIN:
        console.log(action.payload);
        return {
            ...state,
            // items: action.payload
            token: action.payload
        };
    case DETAILS:
        return {
            ...state,
            items: action.payload
        };
    default:
        return state;
    }
};

export default postReducer;
