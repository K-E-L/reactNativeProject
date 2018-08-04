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
    SET_MESSAGE_FIRST_MOJI,
    SPLIT_MESSAGE_BODY
} from '../types';

const initialState = {
    convos: [],
    convo: {},
    convo_messages: [],
    convo_users: [],
    rename_body: '',
    message_body: '',
    message_split: [],
    
    convo_messages_loading: [],
    message_mojis_map: [],
    convo_messages_map: [
        {
            itemID: 0,
            itemMessages: [
                {
                    id: 0,
                    creator_id: 0,
                    creator_name: 'God',
                    body: ['Loading'],
                    like_count: 0,
                    created_at: 'now'
                }
            ]
        }
    ]
};

function convoReducer (state = initialState, action) {
    switch (action.type) {
    case GET_CONVOS:
        return {
            ...state,
            convos: action.payload,
        };
    case GET_CONVO:
        return {
            ...state,
            convo: action.payload,
            rename_body: action.payload.name
        };
    case GET_CONVO_MESSAGES:
        let tempMessages = state.convo_messages_loading;
        if (action.payload !== undefined) {
            for(let i = state.convo_messages_loading.length; i < action.payload.length; i++) {
                tempMessages.push(true);
            }
        }

        let tempMessagesMap = state.convo_messages_map;
        
        function messageExists(id) {
            for (let j=0; j < tempMessagesMap.length; j++) {
                if (tempMessagesMap[j].itemMessages[0].id === id) {
                    return true;
                }
            }
            return false;
        }

        if (action.payload !== undefined) {
            if (messageExists(action.payload[0].id) === false) {
                let wrappedActionPayload = {
                    itemID: action.payload1,
                    itemMessages: [...action.payload]
                };

                tempMessagesMap.push(wrappedActionPayload);
            }
        }

        return {
            ...state,
            convo_messages: action.payload,
            convo_messages_loading: [...tempMessages],
            
            convo_messages_map: [...tempMessagesMap]

        };
    case GET_CONVO_USERS:
        return {
            ...state,
            convo_users: action.payload
        };
    case SET_RENAME_BODY:
        return {
            ...state,
            rename_body: action.payload
        };
    case SET_MESSAGE_BODY:
        return {
            ...state,
            message_body: action.payload
        };
    case MESSAGE:
        return {
            ...state,
            message_body: ''
        };
    case ADD_MESSAGE_MOJI:
        return {
            ...state,
            message_body: state.message_body + action.payload
        };
    case SPLIT_MESSAGE_BODY:
        return {
            ...state,
            message_split: state.message_body.split(' ')
        };
        
    case MESSAGE_LOADED:
        let tempLoading = state.convo_messages_loading;
        tempLoading[action.payload] = false;
        
        return {
            ...state,
            convo_messages_loading: [...tempLoading]
        };
    case SET_MESSAGE_MOJIS_MAP:
        // console.log('reducer', action.payload);
        let tempMessagesLoading = state.convo_messages_loading;
        tempMessagesLoading[action.payload.index] = false;

        let tempMap = state.message_mojis_map;
        
        function exists(id) {
            for (let j=0; j < tempMap.length; j++) {
                if (tempMap[j].id === id) {
                    return true;
                }
            }
            return false;
        }

        if (action.payload.mojis !== undefined) {
            for (let i=0; i < action.payload.mojis.length; i++) {
                if (exists(action.payload.mojis[i].id) === false) {
                    tempMap.push(action.payload.mojis[i]);
                }
            }
        }

        return {
            ...state,
            message_mojis_map: [...tempMap],
            convo_messages_loading: [...tempMessagesLoading],
        };
    case SET_MESSAGE_FIRST_MOJI:
        return {
            ...state,
            message_mojis_map: [...[action.payload.mojis[0]]],
        };


    default:
        return state;
    }
};

export default convoReducer;
