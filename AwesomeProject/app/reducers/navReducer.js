// import: types
import {
    POP_NAV_MOJI,
    POP_NAV_USER,
    POP_NAV_USER_CONVO_TAB,
    PUSH_NAV_MOJI,
    PUSH_NAV_USER,
    PUSH_NAV_USER_CONVO_TAB,
    PUSH_NAV_USER_MOJI_TAB,
    POP_NAV_USER_MOJI_TAB,
    SELEC_IMAGE,
    SET_COMMENT_ID,
    SET_CONVO_ID,
    SET_CONVO_TYPE,
    SET_IMAGE_NAME_BODY,
    SET_MESSAGE_MOJIS_STACK,
    SET_MOJI_KEYBOARD_TYPE,
    SET_MOJI_PREVIEW_TYPE,
    SET_MOJI_TYPE,
    SET_IMAGES,
    TOGGLE_MOJI_PREVIEW,
    TOGGLE_MOJI_KEYBOARD,
    TOGGLE_IMAGE_PRIVATE
} from '../types';

const initialState = {
    user_stack: [],
    user_stack_convo_tab: [],
    user_stack_moji_tab: [],
    
    moji_stack: [],
    moji_type: '',
    
    convo_id: 0,
    convo_type: '',

    comment_id: 0,
    moji_keyboard: false,
    moji_keyboard_type: '',
    moji_preview: false,
    moji_preview_type: '',
    
    images: [],
    selec_image: {
        image: {}
    },
    image_loaded: false,
    image_name_body: '',
    image_private: false
};

function navReducer (state = initialState, action) {
    switch (action.type) {
    case PUSH_NAV_USER:
        return {
            ...state,
            user_stack: [...state.user_stack, action.payload]
        };
    case POP_NAV_USER:
        return {
            ...state,
            user_stack: state.user_stack.slice(0, (state.user_stack.length - 1))
        };
    case PUSH_NAV_USER_CONVO_TAB:
        return {
            ...state,
            user_stack_convo_tab: [...state.user_stack_convo_tab, action.payload]
        };
    case POP_NAV_USER_CONVO_TAB:
        return {
            ...state,
            user_stack_convo_tab: state.user_stack_convo_tab.slice(0, (state.user_stack_convo_tab.length - 1))
        };
    case PUSH_NAV_USER_MOJI_TAB:
        return {
            ...state,
            user_stack_moji_tab: [...state.user_stack_moji_tab, action.payload]
        };
    case POP_NAV_USER_MOJI_TAB:
        return {
            ...state,
            user_stack_moji_tab: state.user_stack_moji_tab.slice(0, (state.user_stack_moji_tab.length - 1))
        };
    case PUSH_NAV_MOJI:
        return {
            ...state,
            moji_stack: [...state.moji_stack, action.payload]
        };
    case POP_NAV_MOJI:
        return {
            ...state,
            moji_stack: state.moji_stack.slice(0, (state.moji_stack.length - 1))
        };
    case SET_CONVO_ID:
        return {
            ...state,
            convo_id: action.payload
        };
    case SET_CONVO_TYPE:
        return {
            ...state,
            convo_type: action.payload
        };
    case SET_MOJI_TYPE:
        return {
            ...state,
            moji_type: action.payload
        };
    case SET_COMMENT_ID:
        return {
            ...state,
            comment_id: action.payload
        };
    case TOGGLE_MOJI_KEYBOARD:
        return {
            ...state,
            moji_keyboard: action.payload
        };
    case SET_MOJI_KEYBOARD_TYPE:
        return {
            ...state,
            moji_keyboard_type: action.payload
        };
    case TOGGLE_MOJI_PREVIEW:
        return {
            ...state,
            moji_preview: action.payload
        };
    case SET_MOJI_PREVIEW_TYPE:
        return {
            ...state,
            moji_preview_type: action.payload
        };
    case SET_IMAGES:
        return {
            ...state,
            images: action.payload
        };
    case SELEC_IMAGE:
        return {
            ...state,
            selec_image: action.payload,
            image_loaded: true
        };
    case SET_IMAGE_NAME_BODY:
        return {
            ...state,
            image_name_body: action.payload,
        };
    case TOGGLE_IMAGE_PRIVATE:
        if (state.image_private === false) {
            return {
                ...state,
                image_private: true,
            };
        }
        else {
            return {
                ...state,
                image_private: false,
            };
        }
        
    default:
        return state;
    }
};

export default navReducer;
