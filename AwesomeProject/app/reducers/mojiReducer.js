// import: types
import {
    COMMENT,
    GET_FOLLOWING_MOJIS,
    GET_MOJI,
    GET_MOJI_COMMENTS,
    GET_POPULAR_MOJIS,
    GET_RECENT_MOJIS,
    REPORT,
    SET_COMMENT_BODY,
    SET_REPORT_BODY
} from '../types';

const initialState = {
    mojis: {
        data: []
    },
    moji: {
        data: {}
    },
    mojiComments: {
        data: []
    },
    commentBody: '',
    reportBody: ''
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
        return {
            ...state,
            mojiComments: action.payload
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

        
    default:
        return state;
    }
};

export default mojiReducer;
