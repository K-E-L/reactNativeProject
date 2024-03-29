// import: types
import {
    ADD_COMMENT_MOJI,
    COMMENT,
    COMMENT_LOADED,
    CLEAR_COMMENT_SPLIT,
    GET_FOLLOWING_MOJIS,
    GET_MAX_MOJI,
    GET_MOJI,
    GET_MOJI_COMMENTS,
    GET_MOJI_COMMENTS_USER_TAB,
    GET_MOJI_USER_TAB,
    GET_POPULAR_MOJIS,
    GET_RECENT_MOJIS,
    REPORT,
    SEARCH_MOJI,
    SET_COMMENT_BODY,
    SET_COMMENT_MOJIS_MAP,
    SET_COMMENT_FIRST_MOJI,
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
    moji_comments_loading: [],
    
    moji_user_tab: {
        data: {},
        type: ''
    },
    moji_comments_user_tab: [],
    moji_comments_loading_user_tab: [],
    
    report_body: '',
    comment_body: '',
    comment_split: [],
    comment_mojis_map: [],
    
    moji_search_body: '',
    moji_search: {
        data: {},
        type: ''
    },
    search_moji_loaded: false,
    search_moji_searching: false,

    max_moji: 0
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
    case GET_MOJI_USER_TAB:
        return {
            ...state,
            moji_user_tab: action.payload
        };
    case GET_MOJI_COMMENTS:
        let tempComments = state.moji_comments_loading;
        for(let i = state.moji_comments_loading.length; i < action.payload.length; i++) {
            tempComments.push(true);
        }
        return {
            ...state,
            moji_comments: action.payload,
            moji_comments_loading: [...tempComments],
        };
    case GET_MOJI_COMMENTS_USER_TAB:
        let tempCommentsUserTab = state.moji_comments_loading_user_tab;
        for(let i = state.moji_comments_loading_user_tab.length; i < action.payload.length; i++) {
            tempCommentsUserTab.push(true);
        }
        return {
            ...state,
            moji_comments_user_tab: action.payload,
            moji_comments_loading_user_tab: [...tempCommentsUserTab],
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
            moji_comments_loading: [...tempLoading]
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
            moji_comments_loading: [...tempCommentsLoading],
        };        
    case SET_MOJI_SEARCH_BODY:
            return {
                ...state,
                moji_search_body: action.payload,
            };
    case SEARCH_MOJI:
        if (action.payload.error === 'Moji not found') {
            return {
                ...state,
                search_moji_loaded: false,
                search_moji_searching: true
            };
        }
        else {
            return {
                ...state,
                moji_search: action.payload,
                search_moji_loaded: true,
                search_moji_searching: true
            };
        }
    case GET_MAX_MOJI:
        return {
            ...state,
            max_moji: action.payload
        };
    case SET_COMMENT_FIRST_MOJI:
        return {
            ...state,
            comment_mojis_map: [...[action.payload.mojis[0]]],
        };
    case CLEAR_COMMENT_SPLIT:
        return {
            ...state,
            comment_split: []
        };

        
    default:
        return state;
    }
};

export default mojiReducer;
