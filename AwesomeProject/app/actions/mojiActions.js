// import: types
import {
    GET_MOJI,
    GET_MOJIS,
    GET_MOJI_COMMENTS
} from '../types';

export const getMojis = (login_cred) => dispatch => {
    fetch('http://167.99.162.15/api/mojis', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: GET_MOJIS,
                  payload: mojis
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getMoji = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/mojis/' + id, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: GET_MOJI,
                  payload: mojis
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getMojiComments = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/mojis/' +
          id +
          '/comments', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(comments =>
              dispatch({
                  type: GET_MOJI_COMMENTS,
                  payload: comments
              })
             )
        .catch((error) => {
            console.error(error);
        });
};
