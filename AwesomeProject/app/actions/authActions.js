// import: types
import {
    LOGIN,
    SET_EMAIL,
    SET_PASSWORD
} from '../types';

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
