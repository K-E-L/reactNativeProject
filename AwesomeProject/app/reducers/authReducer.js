// import: types
import {
    LOGIN,
    SET_EMAIL,
    SET_LOGGED_IN,
    SET_PASSWORD
} from '../types';

const initialState = {
    token: {},
    email: '',
    password: '',
    logged_in: false,
    login_loading: false
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
    case SET_LOGGED_IN:
        return {
            ...state,
            logged_in: true,
            login_loading: true
        };
    case LOGIN:
        return {
            ...state,
            token: action.payload,
            logged_in: true,
            login_loading: false
        };
    default:
        return state;
    }
};

export default authReducer;
