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
    auth_user: {},
    auth_user_email: '',
    
    user: {
        data: {},
        type: ''
    },
    followings: [],
    followers: [],

    user_convo_tab: {
        data: {},
        type: ''
    },
    
    messagable: [],
    
    user_notifs: [],
    convo_notifs: [],
    moji_notifs: [],
    all_notifs: [],
    
    collec: [],
    pub_mojis: [],
    pri_mojis: [],
    
    user_search_body: '',
    user_search: {
        data: {},
        type: ''
    },
    search_user_loaded: false,
    search_user_searching: false
};

function userReducer (state = initialState, action) {
    switch (action.type) {
    case GET_AUTH_USER:
        return {
            ...state,
            auth_user: action.payload.data,
            auth_user_email: action.payload.email
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
            all_notifs: action.payload
        };
    case GET_USER_NOTIFS:
        return {
            ...state,
            user_notifs: action.payload
        };
    case GET_CONVO_NOTIFS:
        return {
            ...state,
            convo_notifs: action.payload
        };
    case GET_MOJI_NOTIFS:
        return {
            ...state,
            moji_notifs: action.payload
        };
    case GET_COLLEC:
        return {
            ...state,
            collec: action.payload
        };
    case GET_PUB_MOJIS:
        return {
            ...state,
            pub_mojis: action.payload
        };
    case GET_PRI_MOJIS:
        return {
            ...state,
            pri_mojis: action.payload
        };
    case SET_USER_SEARCH_BODY:
        return {
            ...state,
            user_search_body: action.payload
        };
    case SEARCH_USER:
        if (action.payload.error === 'User not found') {
            return {
                ...state,
                search_user_loaded: false,
                search_user_searching: true
            };
        }
        else {
            return {
                ...state,
                user_search: action.payload,
                search_user_loaded: true,
                search_user_searching: true
            };
        }
            

    default:
        return state;
    }
};

export default userReducer;
