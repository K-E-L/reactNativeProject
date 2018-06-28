// import: types
import {
    GET_AUTH_USER,
    GET_FOLLOWINGS,
    GET_FOLLOWERS,
    GET_USER
} from '../types';

// const initialState = {
//     items: {
//         user: {
//             type: '',
//             name: '',
//             username: '',
//             followingsCount: 0,
//             followersCount: 0
//         }
//     },
//     followings: {
//         authFollowings: [],
//         authFollowers: []
//     },
//     followers: {
//         authFollowings: [],
//         authFollowers: []
//     },
// };

const initialState = {
    authUser: [],
    user: [],
    followings: [],
    followers: []
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
        console.log('asdf', action.payload);
        return {
            ...state,
            followings: [
                ...state.followings,
                action.payload
            ]
        };
    case GET_FOLLOWERS:
        return {
            ...state,
            followers: action.payload
        };
        
    default:
        return state;
    }
};

export default userReducer;
