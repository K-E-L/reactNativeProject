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
    SET_MESSAGE_MOJIS_ARRAY,
    SET_MESSAGE_MOJIS_STACK,   
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
    convoMessagesMojiArray: [],
    messageMojisStack: []
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
        let temp = [];
        for(let i = 0; i < action.payload.data.length; i++) {
            temp.push(true);
        }
        let temp1 = [];
        for(let i = 0; i < action.payload.data.length; i++) {
            temp1.push([]);
        }
        return {
            ...state,
            convoMessages: action.payload,
            convoMessagesLoading: temp,
            convoMessagesMojiArray: temp1
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

    case SET_MESSAGE_MOJIS_ARRAY:
        let newArr2 = state.convoMessagesMojiArray;
        newArr2[action.payload.index] = action.payload.arr;

        return {
            ...state,
            convoMessagesMojiArray: newArr2
        };

    case SET_MESSAGE_MOJIS_STACK:
        console.log('here', action.payload);
        let newArr1 = state.convoMessagesLoading;
        newArr1[action.payload.index] = false;

        let newArr3 = state.messageMojisStack;
        console.log('messageMojisStack', newArr3);
        console.log('action.payload.mojis', action.payload.mojis);
        // let array3 = newArr3.concat(action.payload.mojis).unique; 

        return {
            ...state,
            messageMojisStack: [...state.messageMojisStack, action.payload],
            // messageMojisStack: action.payload,
            // messageMojisStack: array3,
            convoMessagesLoading: newArr1,
            // convoMessagesMojiArray: newArr3
        };


    default:
        return state;
    }
};

export default convoReducer;
