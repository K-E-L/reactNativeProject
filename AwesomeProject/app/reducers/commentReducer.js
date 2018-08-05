// import: types
import {
    ADD_REPLY_MOJI,
    CLEAR_REPLY_SPLIT,
    GET_COMMENT_REPLIES,
    REPLY,
    REPLY_LOADED,
    SET_REPLY_BODY,
    SET_REPLY_FIRST_MOJI,
    SET_REPLY_MOJIS_MAP,
    SPLIT_REPLY_BODY
} from '../types';

const initialState = {
    replies: [],
    reply_body: '',
    reply_split: [],

    comment_replies_loading: [],
    reply_mojis_map: []
};

function commentReducer (state = initialState, action) {
    switch (action.type) {
    case GET_COMMENT_REPLIES:
        let tempReplies = state.comment_replies_loading;
        for(let i = state.comment_replies_loading.length; i < action.payload.length; i++) {
            tempReplies.push(true);
        }
        return {
            ...state,
            replies: action.payload,
            comment_replies_loading: [...tempReplies]
        };
    case SET_REPLY_BODY:
        return {
            ...state,
            reply_body: action.payload
        };
    case REPLY:
        return {
            ...state,
            reply_body: ''
        };
    case ADD_REPLY_MOJI:
        return {
            ...state,
            reply_body: state.reply_body + action.payload
        };
    case SPLIT_REPLY_BODY:
        return {
            ...state,
            reply_split: state.reply_body.split(' ')
        };
    case REPLY_LOADED:
        let tempLoading = state.comment_replies_loading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            comment_replies_loading: [...tempLoading]
        };
    case SET_REPLY_MOJIS_MAP:
        let tempRepliesLoading = state.comment_replies_loading;
        tempRepliesLoading[action.payload.index] = false;

        let tempMap = state.reply_mojis_map;
        
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
            reply_mojis_map: [...tempMap],
            comment_replies_loading: [...tempRepliesLoading],
        };
    case SET_REPLY_FIRST_MOJI:
        return {
            ...state,
            reply_mojis_map: [...[action.payload.mojis[0]]],
        };
    case CLEAR_REPLY_SPLIT:
        return {
            ...state,
            reply_split: []
        };


        
    default:
        return state;
    }
};

export default commentReducer;
