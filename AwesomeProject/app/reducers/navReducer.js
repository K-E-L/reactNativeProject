// import: types
import {
    GET_NAV_USER_STACK,
    POP_NAV_USER,
    PUSH_NAV_USER,
    SET_COMMENT_ID,
    SET_CONVO_ID,
    SET_CONVO_TYPE,
    SET_MESSAGE_MOJIS_STACK,
    SET_MOJI_ID,
    SET_MOJI_KEYBOARD_TYPE,
    SET_MOJI_TYPE,
    TOGGLE_MOJI_INPUT,
    TOGGLE_MOJI_KEYBOARD
} from '../types';

const initialState = {
    userStack: [],
    convoID: 0,
    convoType: '',
    mojiID: 0,
    mojiType: '',
    commentID: 0,
    mojiKeyboard: false,
    mojiKeyboardType: '',
    mojiInput: false,
};

function navReducer (state = initialState, action) {
    switch (action.type) {
    case PUSH_NAV_USER:
        return {
            ...state,
            userStack: [...state.userStack, action.payload]
        };
    case POP_NAV_USER:
        return {
            ...state,
            userStack: state.userStack.slice(0, (state.userStack.length - 1))
        };
    case SET_CONVO_ID:
        return {
            ...state,
            convoID: action.payload
        };
    case SET_CONVO_TYPE:
        return {
            ...state,
            convoType: action.payload
        };
    case SET_MOJI_ID:
        return {
            ...state,
            mojiID: action.payload
        };
    case SET_MOJI_TYPE:
        return {
            ...state,
            mojiType: action.payload
        };
    case SET_COMMENT_ID:
        return {
            ...state,
            commentID: action.payload
        };
    case TOGGLE_MOJI_KEYBOARD:
        return {
            ...state,
            mojiKeyboard: action.payload
        };
    case SET_MOJI_KEYBOARD_TYPE:
        return {
            ...state,
            mojiKeyboardType: action.payload
        };
    case TOGGLE_MOJI_INPUT:
        return {
            ...state,
            mojiInput: action.payload
        };
        
    default:
        return state;
    }
};

export default navReducer;
