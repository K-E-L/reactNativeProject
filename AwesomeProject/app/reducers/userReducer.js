// import: types
import {
    GET_AUTH_USER,
    GET_COLLEC,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_MESSAGABLE,
    GET_NOTIFS,
    GET_PRI_MOJIS,
    GET_PUB_MOJIS,
    GET_USER,
    SEARCH_USER
} from '../types';

const initialState = {
    authUser: {},
    authUserEmail: '',
    user: {
        data: {},
        type: ''
    },
    followings: [],
    followers: [],
    messagable: [],
    notifs: [],
    collec: [],
    pubMojis: [],
    priMojis: [],
    
    userSearchBody: '',
    searchUser: {}
};

function userReducer (state = initialState, action) {
    switch (action.type) {
    case GET_AUTH_USER:
        return {
            ...state,
            authUser: action.payload.data,
            authUserEmail: action.payload.email
        };
    case GET_USER:        
        return {
            ...state,
            user: action.payload
        };
    case GET_FOLLOWINGS:
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
    case GET_PUB_MOJIS:
        return {
            ...state,
            pubMojis: action.payload
        };
    case GET_PRI_MOJIS:
        return {
            ...state,
            priMojis: action.payload
        };
    case SEARCH_USER:
        // stopped here..
        console.log('reducer', action.payload);
        if (!Array.isArray(action.payload) || !action.payload.length) {
            return {
                ...state,
                // userSearchBody: action.payload.data.username,
                // searchUser: action.payload
            };
        }
        else {
            return {
                ...state,
                userSearchBody: action.payload.data.username,
                searchUser: action.payload
            };
        }

    default:
        return state;
    }
};

export default userReducer;
