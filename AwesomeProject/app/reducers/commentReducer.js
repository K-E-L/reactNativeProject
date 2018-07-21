// import: types
import {
    ADD_REPLY_MOJI,
    GET_COMMENT_REPLIES,
    REPLY,
    REPLY_LOADED,
    SET_REPLY_BODY,
    SET_REPLY_MOJIS_MAP,
    SPLIT_REPLY_BODY
} from '../types';

const initialState = {
    replies: [],
    replyBody: '',
    replySplit: [],

    commentRepliesLoading: [],
    replyMojisMap: []
};

function commentReducer (state = initialState, action) {
    switch (action.type) {
    case GET_COMMENT_REPLIES:
        let tempReplies = state.commentRepliesLoading;
        for(let i = state.commentRepliesLoading.length; i < action.payload.length; i++) {
            tempReplies.push(true);
        }
        return {
            ...state,
            replies: action.payload,
            commentRepliesLoading: tempReplies
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
    case SPLIT_REPLY_BODY:
        return {
            ...state,
            replySplit: state.replyBody.split(' ')
        };
    case REPLY_LOADED:
        let tempLoading = state.commentRepliesLoading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            commentRepliesLoading: tempLoading
        };
    case SET_REPLY_MOJIS_MAP:
        let tempRepliesLoading = state.commentRepliesLoading;
        tempRepliesLoading[action.payload.index] = false;

        let tempMap = state.replyMojisMap;
        
        function exists(id) {
            for (let j=0; j < tempMap.length; j++) {
                if (tempMap[j].id === id) {
                    return true;
                }
            }
            return false;
        }

        for (let i=0; i < action.payload.mojis.length; i++) {
            if (exists(action.payload.mojis[i].id) === false) {
                tempMap.push(action.payload.mojis[i]);
            }
        }

        return {
            ...state,
            replyMojisMap: [...tempMap],
            commentRepliesLoading: tempRepliesLoading,
        };


        
    default:
        return state;
    }
};

export default commentReducer;
