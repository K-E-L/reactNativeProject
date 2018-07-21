// import: types
import {
    ADD_MESSAGE_MOJI,
    GET_CONVO,
    GET_CONVOS,
    GET_CONVO_MESSAGES,
    GET_CONVO_USERS,
    MESSAGE,
    MESSAGE_LOADED,
    SET_RENAME_BODY,
    SET_MESSAGE_BODY,
    SET_MESSAGE_MOJIS_MAP,
    SPLIT_MESSAGE_BODY
} from '../types';

const initialState = {
    convos: [],
    convo: {},
    convoMessages: [],
    convoUsers: [],
    renameBody: '',
    messageBody: '',
    messageSplit: [],
    
    convoMessagesLoading: [],
    messageMojisMap: []
};

function convoReducer (state = initialState, action) {
    switch (action.type) {
    case GET_CONVOS:
        return {
            ...state,
            convos: action.payload
        };
    case GET_CONVO:
        return {
            ...state,
            convo: action.payload,
            renameBody: action.payload.name
        };
    case GET_CONVO_MESSAGES:
        let tempMessages = state.convoMessagesLoading;
        for(let i = state.convoMessagesLoading.length; i < action.payload.length; i++) {
            tempMessages.push(true);
        }
        return {
            ...state,
            convoMessages: action.payload,
            convoMessagesLoading: tempMessages
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
    case ADD_MESSAGE_MOJI:
        return {
            ...state,
            messageBody: state.messageBody + action.payload
        };
    case SPLIT_MESSAGE_BODY:
        return {
            ...state,
            messageSplit: state.messageBody.split(' ')
        };
        
    case MESSAGE_LOADED:
        let tempLoading = state.convoMessagesLoading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            convoMessagesLoading: tempLoading
        };
        
    case SET_MESSAGE_MOJIS_MAP:
        let tempMessagesLoading = state.convoMessagesLoading;
        tempMessagesLoading[action.payload.index] = false;

        let tempMap = state.messageMojisMap;
        
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
            messageMojisMap: [...tempMap],
            convoMessagesLoading: tempMessagesLoading,
        };


    default:
        return state;
    }
};

export default convoReducer;
