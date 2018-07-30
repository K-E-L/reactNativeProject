// import: types
import {
    LOGIN,
    SET_LOGGED_IN,
    SET_LOGIN_EMAIL,
    SET_LOGIN_PASSWORD,
    SET_REGISTER_NAME,
    SET_REGISTER_USERNAME,
    SET_REGISTER_EMAIL,
    SET_REGISTER_SAME_PASSWORD,
    SET_REGISTER_PASSWORD,
    TOGGLE_SHOW_REGISTER,
    TOGGLE_HIDE_LOG_PASSWORD,
    TOGGLE_HIDE_REG_PASSWORD
} from '../types';

const initialState = {
    token: {},
    login_email: '',
    login_password: '',
    logged_in: false,
    login_loading: false,

    show_register: false,

    register_name: '',
    register_username: '',
    register_email: '',
    register_password: '',
    register_same_password: '',

    hide_log_password: true,
    hide_reg_password: true
};

function authReducer (state = initialState, action) {
    switch (action.type) {
    case SET_LOGIN_EMAIL:
        return {
            ...state,
            login_email: action.payload
        };
    case SET_LOGIN_PASSWORD:
        return {
            ...state,
            login_password: action.payload
        };
    case SET_LOGGED_IN:
        return {
            ...state,
            logged_in: true,
            login_loading: true
        };
    case LOGIN:
        return {
            ...state,
            token: action.payload,
            logged_in: true,
            login_loading: false
        };
    case TOGGLE_SHOW_REGISTER:
        if (state.show_register === true) {
            return {
                ...state,
                show_register: false
            };
        }
        else {
            return {
                ...state,
                show_register: true
            };
        }
    case SET_REGISTER_NAME:
        return {
            ...state,
            register_name: action.payload
        };
    case SET_REGISTER_USERNAME:
        return {
            ...state,
            register_username: action.payload
        };
    case SET_REGISTER_EMAIL:
        return {
            ...state,
            register_email: action.payload
        };
    case SET_REGISTER_PASSWORD:
        return {
            ...state,
            register_password: action.payload
        };
    case SET_REGISTER_SAME_PASSWORD:
        return {
            ...state,
            register_same_password: action.payload
        };
    case TOGGLE_HIDE_LOG_PASSWORD:
        if (state.hide_log_password === true) {
            return {
                ...state,
                hide_log_password: false
            };
        }
        else {
            return {
                ...state,
                hide_log_password: true
            };
        }
    case TOGGLE_HIDE_REG_PASSWORD:
        if (state.hide_reg_password === true) {
            return {
                ...state,
                hide_reg_password: false
            };
        }
        else {
            return {
                ...state,
                hide_reg_password: true
            };
        }

    default:
        return state;
    }
};

export default authReducer;
