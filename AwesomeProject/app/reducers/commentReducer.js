// import: types
import {
    ADD_REPLY_MOJI,
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
    case ADD_REPLY_MOJI:
        return {
            ...state,
            replyBody: state.replyBody + action.payload
        };

        
    default:
        return state;
    }
};

export default commentReducer;
