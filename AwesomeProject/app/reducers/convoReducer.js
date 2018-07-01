// import: types
import {
    GET_CONVO,
    GET_CONVOS,
    GET_CONVO_USERS,
    GET_CONVO_MESSAGES
} from '../types';

const initialState = {
    all: {
        data: []
    },
    convo: {},
    convoMessages: {
        data: []
    },
    convoUsers: {
       data: []
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
        return {
            ...state,
            convo: action.payload
        };
    case GET_CONVO_MESSAGES:
        return {
            ...state,
            convoMessages: action.payload
        };
    case GET_CONVO_USERS:
        return {
            ...state,
            convoUsers: action.payload
        };

    default:
        return state;
    }
};

export default convoReducer;
