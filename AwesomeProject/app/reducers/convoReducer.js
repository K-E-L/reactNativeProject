// import: types
import {
    GET_CONVOS,
    GET_CONVO
} from '../types';

const initialState = {
    all: { convos: {} },
    specific: { convo: {} },
};

function convoReducer (state = initialState, action) {
    switch (action.type) {
    case GET_CONVOS:
        return {
            ...state,
            all: action.payload
        };
    case GET_CONVO:
        return {
            ...state,
            specific: action.payload
        };
    default:
        return state;
    }
};

export default convoReducer;
