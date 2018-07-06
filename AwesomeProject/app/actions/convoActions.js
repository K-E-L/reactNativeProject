// import: types
import {
    GET_CONVO,
    GET_CONVO_USERS,
    GET_CONVOS,
    GET_CONVO_MESSAGES,
    MESSAGE,
    SET_MESSAGE_BODY,
    SET_RENAME_BODY
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

export const createConvo = (login_cred, id) => dispatch => {
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
        .catch((error) => {
            console.error(error);
        });
};

export const destroyConvo = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/convos/destroy', {
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
        .catch((error) => {
            console.error(error);
        });
};

export const setRenameBody = (text) => dispatch => {
    dispatch({
        type: SET_RENAME_BODY,
        payload: text
    });
};

export const renameConvo = (login_cred, id, body) => dispatch => {
    fetch('http://167.99.162.15/api/convos/rename', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            body: body
        })
    }).then(res => res.json())
        .catch((error) => {
            console.error(error);
        });
};

export const setMessageBody = (text) => dispatch => {
    dispatch({
        type: SET_MESSAGE_BODY,
        payload: text
    });
};

export const message = (login_cred, id, body) => dispatch => {
    fetch('http://167.99.162.15/api/message', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            body: body
        })
    }).then(res => res.json())
        .then(res => console.log(res))
        .then(convos =>
              dispatch({
                  type: MESSAGE,
                  payload: convos
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

