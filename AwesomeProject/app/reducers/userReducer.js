// import: types
import {
    GET_ALL_NOTIFS,
    GET_AUTH_USER,
    GET_COLLEC,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_MESSAGABLE,
    GET_PRI_MOJIS,
    GET_PUB_MOJIS,
    GET_USER,
    GET_USER_NOTIFS,
    GET_CONVO_NOTIFS,
    GET_MOJI_NOTIFS,
    SEARCH_USER,
    SET_USER_SEARCH_BODY
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
    
    allNotifs: [],
    userNotifs: [],
    convoNotifs: [],
    mojiNotifs: [],
    
    collec: [],
    pubMojis: [],
    priMojis: [],
    
    userSearchBody: '',
    userSearch: {
        data: {},
        type: ''
    },
    searchUserLoaded: false
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
    case GET_ALL_NOTIFS:
        return {
            ...state,
            allNotifs: action.payload
        };
    case GET_USER_NOTIFS:
        return {
            ...state,
            userNotifs: action.payload
        };
    case GET_CONVO_NOTIFS:
        return {
            ...state,
            convoNotifs: action.payload
        };
    case GET_MOJI_NOTIFS:
        return {
            ...state,
            mojiNotifs: action.payload
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
    case SET_USER_SEARCH_BODY:
        return {
            ...state,
            userSearchBody: action.payload
        };
    case SEARCH_USER:
        console.log('reducer', action.payload);
        if (action.payload.error === 'User not found') {
            return {
                ...state
            };
        }
        // else if (action.payload.error === { username: [ 'The username field is required.' ] }) {
        //     console.log('here');
        //     return {
        //         ...state
        //     };
        // }
        else {
            return {
                ...state,
                userSearch: action.payload,
                searchUserLoaded: true
            };
        }
            

    default:
        return state;
    }
};

export default userReducer;
