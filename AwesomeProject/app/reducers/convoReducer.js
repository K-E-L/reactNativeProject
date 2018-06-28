// import: types
import {
    GET_CONVO,
    GET_CONVOS,
    GET_MESSAGES
} from '../types';

const initialState = {
    all: { convos: {} },
    specific: {
        convo: {}
    },
    specificMessages: {
        messages: {}
    }
};

function convoReducer (state = initialState, action) {
    switch (action.type) {
    case GET_CONVOS:
        return {
            ...state,
            all: action.payload
        };
    case GET_CONVO:
        // console.log(action.payload);
        return {
            ...state,
            specific: action.payload
        };
    case GET_MESSAGES:
        // console.log(action.payload);
        return {
            ...state,
            specificMessages: action.payload
        };

    default:
        return state;
    }
};

export default convoReducer;
