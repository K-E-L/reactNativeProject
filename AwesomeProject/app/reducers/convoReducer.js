// import: types
import {
    GET_CONVO,
    GET_CONVOS,
    GET_CONVO_USERS,
    GET_CONVO_MESSAGES,
    MESSAGE,
    SET_RENAME_BODY,
    SET_MESSAGE_BODY
} from '../types';

const initialState = {
    convos: {
        data: []
    },
    convo: {},
    convoMessages: {
        data: []
    },
    convoUsers: {
       data: []
    },
    renameBody: '',
    messageBody: ''
};

function convoReducer (state = initialState, action) {
    switch (action.type) {
    case GET_CONVOS:
        return {
            ...state,
            convos: action.payload
        };
    case GET_CONVO:
        console.log(action.payload);
        return {
            ...state,
            convo: action.payload,
            renameBody: action.payload.name
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
    case SET_RENAME_BODY:
        return {
            ...state,
            renameBody: action.payload
        };
    case SET_MESSAGE_BODY:
        return {
            ...state,
            messageBody: action.payload
        };
    case MESSAGE:
        return {
            ...state,
            messageBody: ''
        };

        
    default:
        return state;
    }
};

export default convoReducer;
