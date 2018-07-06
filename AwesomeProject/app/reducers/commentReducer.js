// import: types
import {
    GET_COMMENT_REPLIES,
} from '../types';

const initialState = {
    replies: {
        data: []
    }
};

function commentReducer (state = initialState, action) {
    switch (action.type) {
    case GET_COMMENT_REPLIES:
        return {
            ...state,
            replies: action.payload
        };
        
    default:
        return state;
    }
};

export default commentReducer;
