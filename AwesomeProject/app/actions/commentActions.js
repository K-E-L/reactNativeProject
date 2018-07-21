// import: types
import {
    ADD_REPLY_MOJI,
    GET_COMMENT_REPLIES,
    REPLY,
    REPLY_LOADED,
    SET_REPLY_BODY,
    SET_REPLY_MOJIS_MAP,
    SPLIT_REPLY_BODY
} from '../types';

export const getCommentReplies = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/comments/' +
          id +
          '/replies', {
              method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(replies =>
              dispatch({
                  type: GET_COMMENT_REPLIES,
                  payload: replies.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const setReplyBody = (text) => dispatch => {
    dispatch({
        type: SET_REPLY_BODY,
        payload: text
    });
};

export const reply = (login_cred, id, body) => dispatch => {
    fetch('http://167.99.162.15/api/replies/create', {
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
        .then(reply =>
              dispatch({
                  type: REPLY,
                  payload: reply
              })
             )
        .then(() => {dispatch(getCommentReplies(login_cred, id));})
        .catch((error) => {
            console.error(error);
        });
};

export const likeReply = (login_cred, reply_id, comment_id) => dispatch => {
    fetch('http://167.99.162.15/api/likes/reply', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: reply_id
        })
    }).then(res => res.json())
        .then(() => {dispatch(getCommentReplies(login_cred, comment_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const dislikeReply = (login_cred, reply_id, comment_id) => dispatch => {
    fetch('http://167.99.162.15/api/dislikes/reply', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: reply_id
        })
    }).then(res => res.json())
        .then(() => {dispatch(getCommentReplies(login_cred, comment_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const addReplyMoji = (text) => dispatch => {
    dispatch({
        type: ADD_REPLY_MOJI,
        payload: text
    });
};

export const splitReplyBody = () => dispatch => {
    dispatch({
        type: SPLIT_REPLY_BODY,
        payload: null
    });
};

export const replyLoaded = (index) => dispatch => {
    dispatch({
        type: REPLY_LOADED,
        payload: index
    });
};

export const setReplyMojiMap = (login_cred, body, index) => dispatch => {
    const temp = body.filter(string => string.substring(0,3) === 'm/#');
    if (!Array.isArray(temp) || !temp.length) {
        dispatch({
            type: REPLY_LOADED,
            payload: index
        });
        return null;
    }
    const temp1 = temp.map(string => string.replace('m/#', ''));
    const temp2 = temp1.reduce((acc, val) => acc.concat(val), []);

    return fetch('http://167.99.162.15/api/mojis/collection', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            arr: temp2
        })
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: SET_REPLY_MOJIS_MAP,
                  payload: {index: index, mojis: mojis.data}
              })
             )
        .catch((error) => {
            console.error(error);
        });
};
