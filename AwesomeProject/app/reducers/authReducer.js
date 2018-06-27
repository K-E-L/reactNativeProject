// import: types
import {
    FETCH_POSTS,
    LOGIN,
    SET_EMAIL,
    SET_PASSWORD
} from '../types';

const initialState = {
    token: {},
    email: '',
    password: '',
    logged_in: false
};

function authReducer (state = initialState, action) {
    switch (action.type) {
    case SET_EMAIL:
        return {
            ...state,
            email: action.payload
        };
    case SET_PASSWORD:
        return {
            ...state,
            password: action.payload
        };
    case LOGIN:
        return {
            ...state,
            token: action.payload,
            logged_in: true
        };
    default:
        return state;
    }
};

export default authReducer;
