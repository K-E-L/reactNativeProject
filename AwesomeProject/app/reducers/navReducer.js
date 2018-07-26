// import: types
import {
    GET_NAV_USER_STACK,
    POP_NAV_MOJI,
    POP_NAV_USER,
    PUSH_NAV_MOJI,
    PUSH_NAV_USER,
    SET_COMMENT_ID,
    SET_CONVO_ID,
    SET_CONVO_NAME,
    SET_CONVO_TYPE,
    SET_MESSAGE_MOJIS_STACK,
    SET_MOJI_ID,
    SET_MOJI_KEYBOARD_TYPE,
    SET_MOJI_PREVIEW_TYPE,
    SET_MOJI_TYPE,
    SET_IMAGES,
    TOGGLE_MOJI_PREVIEW,
    TOGGLE_MOJI_KEYBOARD,
    TRIGGER_STATE_CHANGE
} from '../types';

const initialState = {
    userStack: [],
    mojiStack: [],
    convoID: 0,
    convoName: '',
    convoType: '',
    mojiID: 0,
    mojiType: '',
    commentID: 0,
    mojiKeyboard: false,
    mojiKeyboardType: '',
    mojiPreview: false,
    mojiPreviewType: '',
    stateChange: false,
    
    images: []
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
    case PUSH_NAV_MOJI:
        return {
            ...state,
            mojiStack: [...state.mojiStack, action.payload]
        };
    case POP_NAV_MOJI:
        return {
            ...state,
            mojiStack: state.mojiStack.slice(0, (state.mojiStack.length - 1))
        };
    case SET_CONVO_ID:
        return {
            ...state,
            convoID: action.payload
        };
    case SET_CONVO_NAME:
        return {
            ...state,
            convoName: action.payload
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
    case TOGGLE_MOJI_PREVIEW:
        return {
            ...state,
            mojiPreview: action.payload
        };
    case SET_MOJI_PREVIEW_TYPE:
        return {
            ...state,
            mojiPreviewType: action.payload
        };
    case TRIGGER_STATE_CHANGE:
        if (state.stateChange === false) {
            return {
                ...state,
                stateChange: true
            };
        }
        else {
            return {
                ...state,
                stateChange: false
            };
        }
    case SET_IMAGES:
        return {
            ...state,
            images: action.payload
        };
        
    default:
        return state;
    }
};

export default navReducer;
