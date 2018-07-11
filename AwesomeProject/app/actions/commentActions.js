// import: types
import {
    GET_COMMENT_REPLIES,
    REPLY,
    SET_REPLY_BODY
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
                  payload: replies
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

export const reply = (login_cred, id, body, name) => dispatch => {
    console.log('name', name);
    console.log('body', body);
    fetch('http://167.99.162.15/api/replies/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            body: '@' + name + ' ' + body
        })
    }).then(res => res.json())
        .then(res => console.log('action', res))
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



