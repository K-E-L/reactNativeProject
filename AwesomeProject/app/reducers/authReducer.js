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
    loggedIn: false,
    loginLoading: false
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
            loggedIn: true,
            loginLoading: true
        };
    case LOGIN:
        console.log('reducer', action.payload);
        return {
            ...state,
            token: action.payload,
            loggedIn: true,
            loginLoading: false
        };
    default:
        return state;
    }
};

export default authReducer;
