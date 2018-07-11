// import: types
import {
    GET_AUTH_USER,
    GET_COLLEC,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_MESSAGABLE,
    GET_NOTIFS,
    GET_USER
} from '../types';

const initialState = {
    authUser: {
        data: {}
    },
    user: {
        data: {}
    },
    followings: {
        data: []
    },
    followers: {
        data: []
    },
    messagable: {
        data: []
    },
    notifs: {
        data: []
    },
    collec: {
        data: []
    }
};

function userReducer (state = initialState, action) {
    switch (action.type) {
    case GET_AUTH_USER:
        return {
            ...state,
            authUser: action.payload
        };
    case GET_USER:        
        return {
            ...state,
            user: action.payload
        };
    case GET_FOLLOWINGS:
        console.log('got followings');
        return {
            ...state,
            followings: action.payload
        };
    case GET_FOLLOWERS:
        return {
            ...state,
            followers: action.payload
        };
    case GET_MESSAGABLE:
        return {
            ...state,
            messagable: action.payload
        };
    case GET_NOTIFS:
        return {
            ...state,
            notifs: action.payload
        };
    case GET_COLLEC:
        return {
            ...state,
            collec: action.payload
        };
        

        
    default:
        return state;
    }
};

export default userReducer;
