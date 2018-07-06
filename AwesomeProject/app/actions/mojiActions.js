// import: types
import {
    COMMENT,
    GET_MOJI,
    GET_MOJIS,
    GET_MOJI_COMMENTS,
    REPORT,
    SET_COMMENT_BODY,
    SET_REPORT_BODY
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

export const setCommentBody = (text) => dispatch => {
    dispatch({
        type: SET_COMMENT_BODY,
        payload: text
    });
};

export const comment = (login_cred, id, body) => dispatch => {
    fetch('http://167.99.162.15/api/comments/create', {
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
        .then(comment =>
              dispatch({
                  type: COMMENT,
                  payload: comment
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const setReportBody = (text) => dispatch => {
    dispatch({
        type: SET_REPORT_BODY,
        payload: text
    });
};

export const report = (login_cred, id, body) => dispatch => {
    fetch('http://167.99.162.15/api/reports/create', {
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
        .then(report =>
              dispatch({
                  type: REPORT,
                  payload: report
              })
             )
        .catch((error) => {
            console.error(error);
        });
};