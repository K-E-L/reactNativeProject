// import: types
import {
    GET_COMMENT_REPLIES,
    REPLY,
    SET_REPLY_BODY
} from '../types';

const initialState = {
    replies: {
        data: []
    },
    replyBody: ''
    
};

function commentReducer (state = initialState, action) {
    switch (action.type) {
    case GET_COMMENT_REPLIES:
        return {
            ...state,
            replies: action.payload
        };
    case SET_REPLY_BODY:
        return {
            ...state,
            replyBody: action.payload
        };
    case REPLY:
        return {
            ...state,
            replyBody: ''
        };


        
    default:
        return state;
    }
};

export default commentReducer;
