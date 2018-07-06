// import: types
import {
    GET_AUTH_USER,
    GET_FOLLOWINGS,
    GET_FOLLOWERS,
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
    notifs: {
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
        return {
            ...state,
            followings: action.payload
            // followings: [
            //     ...state.followings,
            //     action.payload
            // ]
        };
    case GET_FOLLOWERS:
        return {
            ...state,
            followers: action.payload
        };
    case GET_NOTIFS:
        return {
            ...state,
            notifs: action.payload
        };
        

        
    default:
        return state;
    }
};

export default userReducer;
