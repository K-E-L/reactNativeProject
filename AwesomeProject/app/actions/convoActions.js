// import: types
import {
    ADD_MESSAGE_MOJI,
    CLEAR_MESSAGE_SPLIT,
    GET_CONVO,
    GET_CONVOS,
    SET_CONVO_MESSAGES_MAP,
    GET_CONVO_USERS,
    MESSAGE,
    MESSAGE_LOADED,
    SET_MESSAGE_BODY,
    SET_MESSAGE_MOJIS_MAP,
    SET_RENAME_BODY,
    SPLIT_MESSAGE_BODY
} from '../types';

export const getConvos = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/convos', {
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
                  payload: convos.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvo = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/convos/' + id, {
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

export const setConvoMessagesMap = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/convos/' +
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
                  type: SET_CONVO_MESSAGES_MAP,
                  payload: messages.data,
                  payload1: id
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvoUsers = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/convos/' +
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
                  payload: users.data
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
        .then(() => {dispatch(getConvos(login_cred));})
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
        .then(() => {dispatch(getConvos(login_cred));})
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
        .then(() => {dispatch(getConvo(login_cred, id));})
        .then(() => {dispatch(getConvos(login_cred));})
        .then(() => {dispatch(setConvoMessagesMap(login_cred, id));})

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
        .then(convos =>
              dispatch({
                  type: MESSAGE,
                  payload: convos
              })
             )
        .then(() => {dispatch(setConvoMessagesMap(login_cred, id));})
        .then(() => {dispatch(clearMessageSplit());})
        .catch((error) => {
            console.error(error);
        });
};

export const likeMessage = (login_cred, message_id, convo_id) => dispatch => {
    fetch('http://167.99.162.15/api/likes/message', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: message_id
        })
    }).then(res => res.json())
        .then(() => {dispatch(setConvoMessagesMap(login_cred, convo_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const addUser = (login_cred, add_id, convo_id) => dispatch => {
    fetch('http://167.99.162.15/api/convos/addUser', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            add_id: add_id,
            convo_id: convo_id
        })
          }).then(res => res.json())
        .then(() => {dispatch(getConvo(login_cred, convo_id));})
        .then(() => {dispatch(getConvoUsers(login_cred, convo_id));})
        .then(() => {dispatch(setConvoMessagesMap(login_cred, convo_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const addMessageMoji = (text) => dispatch => {
    dispatch({
        type: ADD_MESSAGE_MOJI,
        payload: text
    });
};

export const splitMessageBody = () => dispatch => {
    dispatch({
        type: SPLIT_MESSAGE_BODY,
        payload: null
    });
};

export const messageLoaded = (index) => dispatch => {
    dispatch({
        type: MESSAGE_LOADED,
        payload: index
    });
};

export const setMessageMojiMap = (login_cred, arrMojis, index) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/collection', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            arr: arrMojis
        })
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: SET_MESSAGE_MOJIS_MAP,
                  payload: {index: index, mojis: mojis.data}
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const clearMessageSplit = () => dispatch => {
    dispatch({
        type: CLEAR_MESSAGE_SPLIT,
        payload: null
    });
};

