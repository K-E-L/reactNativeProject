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
    mojiComments: [],
    reportBody: '',
    commentBody: '',
    commentSplit: [],
    mojiCommentsLoading: [],
    commentMojisMap: [],
    
    mojiSearchBody: '',
    mojiSearch: {
        data: {},
        type: ''
    },
    searchMojiLoaded: false
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
        let tempComments = state.mojiCommentsLoading;
        for(let i = state.mojiCommentsLoading.length; i < action.payload.length; i++) {
            tempComments.push(true);
        }
        return {
            ...state,
            mojiComments: action.payload,
            mojiCommentsLoading: tempComments,
        };
    case SET_COMMENT_BODY:
        return {
            ...state,
            commentBody: action.payload
        };
    case COMMENT:
        return {
            ...state,
            commentBody: ''
        };
    case SET_REPORT_BODY:
        return {
            ...state,
            reportBody: action.payload
        };
    case REPORT:
        return {
            ...state,
            reportBody: ''
        };
    case ADD_COMMENT_MOJI:
        return {
            ...state,
            commentBody: state.commentBody + action.payload
        };
    case SPLIT_COMMENT_BODY:
        return {
            ...state,
            commentSplit: state.commentBody.split(' ')
        };
        
    case COMMENT_LOADED:
        let tempLoading = state.mojiCommentsLoading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            mojiCommentsLoading: tempLoading
        };
    case SET_COMMENT_MOJIS_MAP:
        let tempCommentsLoading = state.mojiCommentsLoading;
        tempCommentsLoading[action.payload.index] = false;

        let tempMap = state.commentMojisMap;
        
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
            commentMojisMap: [...tempMap],
            mojiCommentsLoading: tempCommentsLoading,
        };
        
    case SET_MOJI_SEARCH_BODY:
        return {
            ...state,
            mojiSearchBody: action.payload
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
                mojiSearch: action.payload,
                searchMojiLoaded: true
            };
        }


        
    default:
        return state;
    }
};

export default mojiReducer;
