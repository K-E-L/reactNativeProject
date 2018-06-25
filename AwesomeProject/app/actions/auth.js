// import: types
import {
    DETAILS,
    FETCH_POSTS,
    LOGIN_FORM,
    LOGIN_REQUEST,
    TEST
} from './types';

// export const username = (text) => dispatch => {
//     dispatch({
//         type: LOGIN_FORM,
//         payload: text
//     });
// };

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

export const login = () => dispatch => {
    fetch('http://178.128.177.180/api/login', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'dillon@ching.com',
            password: 'asdf',
        }),
    }).then(res => res.json())
        .then(login_cred =>
              dispatch({
                  type: LOGIN_REQUEST,
                  payload: login_cred
              })
             )
        .then(console.log('login successful'))
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
        .then(res => console.log('details', res))
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


