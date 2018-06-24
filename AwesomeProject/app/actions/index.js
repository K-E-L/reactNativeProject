import { FETCH_POSTS, LOGIN, DETAILS, TEST } from './types';

export const testFunc = (text) => dispatch => {
    // return {
    //     type: TEST,
    //     payload: 'Dillon'
    // };
    
    dispatch({
        type: TEST,
        payload: text
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
                  type: LOGIN,
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


