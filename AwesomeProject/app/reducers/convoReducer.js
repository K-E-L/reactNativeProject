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
        let temp1 = state.convoMessagesLoading;
        for(let i = state.convoMessagesLoading.length; i < action.payload.data.length; i++) {
            temp1.push(true);
        }
        return {
            ...state,
            convoMessages: action.payload,
            convoMessagesLoading: temp1,
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
        let newArr = state.convoMessagesLoading;
        newArr[action.payload] = false;
        
        return {
            ...state,
            convoMessagesLoading: newArr
        };
        
    case SET_MESSAGE_MOJIS_MAP:
        let newArr1 = state.convoMessagesLoading;
        newArr1[action.payload.index] = false;

        let newArr3 = state.messageMojisMap;
        
        function exists(id) {
            for (let j=0; j < newArr3.length; j++) {
                if (newArr3[j].id === id) {
                    return true;
                }
            }
            return false;
        }

        for (let i=0; i < action.payload.mojis.length; i++) {
            if (exists(action.payload.mojis[i].id) === false) {
                newArr3.push(action.payload.mojis[i]);
            }
        }

        return {
            ...state,
            messageMojisMap: [...newArr3],
            convoMessagesLoading: newArr1,
        };


    default:
        return state;
    }
};

export default convoReducer;
