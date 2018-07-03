// import: types
import {
    GET_CONVO,
    GET_CONVO_USERS,
    GET_CONVOS,
    GET_CONVO_MESSAGES
} from '../types';

export const getConvos = (login_cred) => dispatch => {
    fetch('http://167.99.162.15/api/convos', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(convos =>
              dispatch({
                  type: GET_CONVOS,
                  payload: convos
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvo = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/convos/' + id, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(convo =>
              dispatch({
                  type: GET_CONVO,
                  payload: convo
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvoMessages = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/convos/' +
          id +
          '/messages', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(messages =>
              dispatch({
                  type: GET_CONVO_MESSAGES,
                  payload: messages
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvoUsers = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/convos/' +
          id +
          '/users', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(users =>
              dispatch({
                  type: GET_CONVO_USERS,
                  payload: users
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const createConvo = (id, login_cred) => dispatch => {
    fetch('http://167.99.162.15/api/convos/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    }).then(res => res.json())
        .then(res => console.log(res))
        .catch((error) => {
            console.error(error);
        });
};



