// import: types
import {
    COMMENT,
    GET_MOJI,
    GET_MOJIS,
    GET_MOJI_COMMENTS,
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
    case GET_MOJIS:
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
