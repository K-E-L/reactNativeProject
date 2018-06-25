// import: types
import {
    DETAILS,
    FETCH_POSTS,
    LOGIN_REQUEST,
    SET_EMAIL,
    SET_PASSWORD
} from '../actions/types';

const initialState = {
    items: {},
    token: {},
    email: '',
    password: ''
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
    case LOGIN_REQUEST:
        console.log(action.payload);
        return {
            ...state,
            token: action.payload
        };
    case DETAILS:
        return {
            ...state,
            items: action.payload
        };

        
    case FETCH_POSTS:
        console.log(action.payload);
        return {
            ...state,
            items: action.payload
        };
    default:
        return state;
    }
};

export default authReducer;
