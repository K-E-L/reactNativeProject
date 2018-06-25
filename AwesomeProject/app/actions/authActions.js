// import: types
import {
    DETAILS,
    FETCH_POSTS,
    LOGIN_REQUEST,
    SET_EMAIL,
    SET_PASSWORD
} from './types';

export const setEmail = (text) => dispatch => {
    dispatch({
        type: SET_EMAIL,
        payload: text
    });
};

export const setPassword = (text) => dispatch => {
    dispatch({
        type: SET_PASSWORD,
        payload: text
    });
};

export const login = (email, password) => dispatch => {
    fetch('http://178.128.177.180/api/login', {
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
                  type: LOGIN_REQUEST,
                  payload: login_cred
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const details = (login_cred) => dispatch => {
    fetch('http://178.128.177.180/api/details', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(user =>
              dispatch({
                  type: DETAILS,
                  payload: user
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getData = () => dispatch => {
    fetch('http://178.128.177.180/api')
        .then(res => res.json())
        .then(posts =>
              dispatch({
                  type: FETCH_POSTS,
                  payload: posts
              })
             );
};


