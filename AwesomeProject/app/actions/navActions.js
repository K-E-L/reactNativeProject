import {
    DEC_MESSAGE_MOJIS_COUNT,
    GET_NAV_USER_STACK,
    POP_NAV_USER,
    PUSH_NAV_USER,
    SET_COMMENT_ID,
    SET_CONVO_ID,
    SET_CONVO_TYPE,
    SET_MESSAGE_MOJIS_STACK,
    SET_MESSAGE_MOJIS_ARRAY,
    SET_MOJI_ID,
    SET_MOJI_KEYBOARD_TYPE,
    SET_MOJI_TYPE,
    TOGGLE_MOJI_INPUT,
    TOGGLE_MOJI_KEYBOARD
} from '../types';

export const pushNavUser = (id) => dispatch => {
    dispatch({
        type: PUSH_NAV_USER,
        payload: id
    });
};

export const popNavUser = () => dispatch => {
    dispatch({
        type: POP_NAV_USER,
        payload: 0
    });
};

export const getNavUserStack = () => dispatch => {
    dispatch({
        type: GET_NAV_USER_STACK,
        payload: 0
    });
};

export const setConvoID = (id) => dispatch => {
    dispatch({
        type: SET_CONVO_ID,
        payload: id
    });
};

export const setConvoType = (type) => dispatch => {
    dispatch({
        type: SET_CONVO_TYPE,
        payload: type
    });
};

export const setMojiID = (id) => dispatch => {
    dispatch({
        type: SET_MOJI_ID,
        payload: id
    });
};

export const setMojiType = (type) => dispatch => {
    dispatch({
        type: SET_MOJI_TYPE,
        payload: type
    });
};

export const setCommentID = (id) => dispatch => {
    dispatch({
        type: SET_COMMENT_ID,
        payload: id
    });
};

export const toggleMojiKeyboard = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_MOJI_KEYBOARD,
        payload: toggle
    });
};

export const setMojiKeyboardType = (type) => dispatch => {
    dispatch({
        type: SET_MOJI_KEYBOARD_TYPE,
        payload: type
    });
};

export const toggleMojiInput = (toggle) => dispatch => {
    dispatch({
        type: TOGGLE_MOJI_INPUT,
        payload: toggle
    });
};

export const getMessageMojis = (text) => dispatch => {
    dispatch({
        type: SET_MESSAGE_MOJIS_ARRAY,
        payload: text
    });
};

export const decMessageMojisCount = () => dispatch => {
    dispatch({
        type: DEC_MESSAGE_MOJIS_COUNT,
        payload: null
    });
};

export const setMessageMojiStack = (login_cred, arr) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/collection', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            arr: arr
        })
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: SET_MESSAGE_MOJIS_STACK,
                  payload: mojis
              })
             )
        .catch((error) => {
            console.error(error);
        });
};


