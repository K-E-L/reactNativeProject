// import: types
import {
    GET_MOJI,
    GET_MOJIS,
    GET_MOJI_COMMENTS
} from '../types';

const initialState = {
    mojis: {
        data: []
    },
    moji: {},
    mojiComments: {
        data: []
    }
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
        
    default:
        return state;
    }
};

export default mojiReducer;
