// import: types
import {
    GET_AUTH_USER,
    GET_USER
} from '../types';

const initialState = {
    auth: { user: {} },
    other: { user: {} }
};

function userReducer (state = initialState, action) {
    switch (action.type) {
    case GET_AUTH_USER:
        return {
            ...state,
            auth: action.payload
        };
    case GET_USER:
        return {
            ...state,
            other: action.payload
        };

        
    default:
        return state;
    }
};

export default userReducer;
