// import: types
import {
    DETAILS,
    FETCH_POSTS,
    LOGIN_FORM,
    LOGIN_REQUEST,
    TEST
} from './types';

const initialState = {
    items: [],
    token: {},
    login_info: {}
};

function authReducer (state = initialState, action) {
    switch (action.type) {
    case FETCH_POSTS:
        return {
            ...state,
            items: action.payload
        };
        return state;
    case LOGIN_REQUEST:
        console.log(action.payload);
        return {
            ...state,
            // items: action.payload
            token: action.payload
        };
    case LOGIN_FORM:
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

export default authReducer;
