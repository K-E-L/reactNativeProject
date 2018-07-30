// import: types
import {
    LOGIN,
    SET_LOGIN_EMAIL,
    SET_LOGGED_IN,
    SET_LOGIN_PASSWORD,
    SET_REGISTER_NAME,
    SET_REGISTER_USERNAME,
    SET_REGISTER_EMAIL,
    SET_REGISTER_PASSWORD,
    SET_REGISTER_SAME_PASSWORD,
    TOGGLE_SHOW_REGISTER,
    TOGGLE_HIDE_LOG_PASSWORD,
    TOGGLE_HIDE_REG_PASSWORD
} from '../types';

export const setLoginEmail = (email) => dispatch => {
    dispatch({
        type: SET_LOGIN_EMAIL,
        payload: email
    });
};

export const setLoginPassword = (password) => dispatch => {
    dispatch({
        type: SET_LOGIN_PASSWORD,
        payload: password
    });
};

export const login = (email, password) => dispatch => {
    dispatch({
        type: SET_LOGGED_IN,
        payload: null
    });
    fetch('http://167.99.162.15/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // email: email,
            // password: password
            email: 'dillon@ching.com',
            password: 'asdf'
        }),
    }).then(res => res.json())
        .then(login_cred =>
              dispatch({
                  type: LOGIN,
                  payload: login_cred
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const toggleShowRegister = () => dispatch => {
    dispatch({
        type: TOGGLE_SHOW_REGISTER,
        payload: null
    });
};

export const setRegisterName = (name) => dispatch => {
    dispatch({
        type: SET_REGISTER_NAME,
        payload: name
    });
};

export const setRegisterUsername = (username) => dispatch => {
    dispatch({
        type: SET_REGISTER_USERNAME,
        payload: username
    });
};

export const setRegisterEmail = (email) => dispatch => {
    dispatch({
        type: SET_REGISTER_EMAIL,
        payload: email
    });
};

export const setRegisterPassword = (password) => dispatch => {
    dispatch({
        type: SET_REGISTER_PASSWORD,
        payload: password
    });
};

export const setRegisterSamePassword = (password) => dispatch => {
    dispatch({
        type: SET_REGISTER_SAME_PASSWORD,
        payload: password
    });
};

export const toggleHideLogPassword = () => dispatch => {
    dispatch({
        type: TOGGLE_HIDE_LOG_PASSWORD,
        payload: null
    });
};

export const toggleHideRegPassword = () => dispatch => {
    dispatch({
        type: TOGGLE_HIDE_REG_PASSWORD,
        payload: null
    });
};

export const register = (name, username, email, password, samepass) => dispatch => {
    fetch('http://167.99.162.15/api/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // name: name,
            // username: username,
            // email: email,
            // password: password,
            // samepass: samepass
            name: 'uh huh',
            username: 'uhhuh',
            email: 'uh@huh.com',
            password: 'asdf',
            samepass: 'asdf'
        }),
    }).then(res => res.json())
        // .then(res => console.log('action', res))
        .then(login_cred =>
              dispatch({
                  type: LOGIN,
                  payload: login_cred
              })
             )
        .then(() =>
              dispatch({
                  type: SET_LOGGED_IN,
                  payload: null
              })
             )
        .catch((error) => {
            console.error(error);
        });
};
