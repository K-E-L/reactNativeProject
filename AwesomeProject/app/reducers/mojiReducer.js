// import: types
import {
    ADD_COMMENT_MOJI,
    COMMENT,
    COMMENT_LOADED,
    GET_FOLLOWING_MOJIS,
    GET_MOJI,
    GET_MOJI_COMMENTS,
    GET_POPULAR_MOJIS,
    GET_RECENT_MOJIS,
    REPORT,
    SEARCH_MOJI,
    SET_COMMENT_BODY,
    SET_COMMENT_MOJIS_MAP,
    SET_MOJI_SEARCH_BODY,
    SET_REPORT_BODY,
    SPLIT_COMMENT_BODY
} from '../types';

const initialState = {
    mojis: [],
    moji: {
        data: {},
        type: ''
    },
    moji_comments: [],
    report_body: '',
    comment_body: '',
    comment_split: [],
    moji_comments_loading: [],
    comment_mojis_map: [],
    
    moji_search_body: '',
    moji_search: {
        data: {},
        type: ''
    },
    search_moji_loaded: false
};

function mojiReducer (state = initialState, action) {
    switch (action.type) {
    case GET_POPULAR_MOJIS:
        return {
            ...state,
            mojis: action.payload
        };
    case GET_RECENT_MOJIS:
        return {
            ...state,
            mojis: action.payload
        };
    case GET_FOLLOWING_MOJIS:
        return {
            ...state,
            mojis: action.payload
        };
    case GET_MOJI:
        return {
            ...state,
            moji: action.payload
        };
    case GET_MOJI_COMMENTS:
        let tempComments = state.moji_comments_loading;
        for(let i = state.moji_comments_loading.length; i < action.payload.length; i++) {
            tempComments.push(true);
        }
        return {
            ...state,
            moji_comments: action.payload,
            moji_comments_loading: tempComments,
        };
    case SET_COMMENT_BODY:
        return {
            ...state,
            comment_body: action.payload
        };
    case COMMENT:
        return {
            ...state,
            comment_body: ''
        };
    case SET_REPORT_BODY:
        return {
            ...state,
            report_body: action.payload
        };
    case REPORT:
        return {
            ...state,
            report_body: ''
        };
    case ADD_COMMENT_MOJI:
        return {
            ...state,
            comment_body: state.comment_body + action.payload
        };
    case SPLIT_COMMENT_BODY:
        return {
            ...state,
            comment_split: state.comment_body.split(' ')
        };
        
    case COMMENT_LOADED:
        let tempLoading = state.moji_comments_loading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            moji_comments_loading: tempLoading
        };
    case SET_COMMENT_MOJIS_MAP:
        let tempCommentsLoading = state.moji_comments_loading;
        tempCommentsLoading[action.payload.index] = false;

        let tempMap = state.comment_mojis_map;
        
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
            comment_mojis_map: [...tempMap],
            moji_comments_loading: tempCommentsLoading,
        };
        
    case SET_MOJI_SEARCH_BODY:
        return {
            ...state,
            moji_search_body: action.payload
        };
    case SEARCH_MOJI:
        console.log('reducer', action.payload);
        if (action.payload.error === 'Moji not found') {
            return {
                ...state
            };
        }
        else {
            return {
                ...state,
                moji_search: action.payload,
                search_moji_loaded: true
            };
        }


        
    default:
        return state;
    }
};

export default mojiReducer;
