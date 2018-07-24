// import: types
import {
    ADD_COMMENT_MOJI,
    COMMENT,
    COMMENT_LOADED,
    GET_FOLLOWING_MOJIS,
    GET_MOJI,
    GET_MOJI_COMMENTS,
    GET_POPULAR_MOJIS,
    GET_RECENT_MOJIS,
    REPORT,
    SEARCH_MOJI,
    SET_COMMENT_BODY,
    SET_COMMENT_MOJIS_MAP,
    SET_MOJI_SEARCH_BODY,
    SET_REPORT_BODY,
    SPLIT_COMMENT_BODY
} from '../types';

export const getPopularMojis = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/popular', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: GET_POPULAR_MOJIS,
                  payload: mojis.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getRecentMojis = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/recent', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: GET_RECENT_MOJIS,
                  payload: mojis.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getFollowingMojis = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/following', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(mojis =>
              dispatch({
                  type: GET_FOLLOWING_MOJIS,
                  payload: mojis.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getMoji = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/mojis/' + id, {
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
    return fetch('http://167.99.162.15/api/mojis/' +
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
                  payload: comments.data
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
        .then(() => {dispatch(getMojiComments(login_cred, id));})
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

export const likeMoji = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/likes/moji', {
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
        .then(() => {dispatch(getMoji(login_cred, id));})
        .catch((error) => {
            console.error(error);
        });
};

export const dislikeMoji = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/dislikes/moji', {
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
        .then(() => {dispatch(getMoji(login_cred, id));})
        .catch((error) => {
            console.error(error);
        });
};

export const likeComment = (login_cred, comment_id, moji_id) => dispatch => {
    fetch('http://167.99.162.15/api/likes/comment', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: comment_id
        })
    }).then(res => res.json())
        .then(() => {dispatch(getMojiComments(login_cred, moji_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const dislikeComment = (login_cred, comment_id, moji_id) => dispatch => {
    fetch('http://167.99.162.15/api/dislikes/comment', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: comment_id
        })
    }).then(res => res.json())
        .then(() => {dispatch(getMojiComments(login_cred, moji_id));})
        .catch((error) => {
            console.error(error);
        });
};

export const CollecUncollec = (login_cred, id, collecType) => dispatch => {
    switch (collecType) {
    case 'Collec':
        fetch('http://167.99.162.15/api/collec', {
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
            .then(() => {dispatch(getMoji(login_cred, id));})
            .catch((error) => {
                console.error(error);
            });
        break;
    case 'Uncollec':
        fetch('http://167.99.162.15/api/collec/remove', {
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
            .then(() => {dispatch(getMoji(login_cred, id));})
            .catch((error) => {
                console.error(error);
            });
        break;
    default:
        console.log('error: type not found');
    }
};

export const addCommentMoji = (text) => dispatch => {
    dispatch({
        type: ADD_COMMENT_MOJI,
        payload: text
    });
};

export const splitCommentBody = () => dispatch => {
    dispatch({
        type: SPLIT_COMMENT_BODY,
        payload: null
    });
};

export const setCommentMojiMap = (login_cred, body, index) => dispatch => {
    const temp = body.filter(string => string.substring(0,3) === 'm/#');
    if (!Array.isArray(temp) || !temp.length) {
        dispatch({
            type: COMMENT_LOADED,
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
                  type: SET_COMMENT_MOJIS_MAP,
                  payload: {index: index, mojis: mojis.data}
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const commentLoaded = (index) => dispatch => {
    dispatch({
        type: COMMENT_LOADED,
        payload: index
    });
};

export const searchMoji = (login_cred, name) => dispatch => {
    fetch('http://167.99.162.15/api/mojis/search', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name
        })
    }).then(res => res.json())
        .then(moji =>
              dispatch({
                  type: SEARCH_MOJI,
                  payload: moji
              })
             )
        .catch((error) => {
            console.error(error);
        });
    
};

export const setMojiSearchBody = (text) => dispatch => {
    dispatch({
        type: SET_MOJI_SEARCH_BODY,
        payload: text
    });
};
