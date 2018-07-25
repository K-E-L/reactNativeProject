// import: types
import {
    GET_ALL_NOTIFS,
    GET_AUTH_USER,
    GET_COLLEC,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_MESSAGABLE,
    GET_PRI_MOJIS,
    GET_PUB_MOJIS,
    GET_USER,
    GET_USER_NOTIFS,
    GET_CONVO_NOTIFS,
    GET_MOJI_NOTIFS,
    SEARCH_USER,
    SET_USER_SEARCH_BODY
} from '../types';

export const getAuthUser = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(user =>
              dispatch({
                  type: GET_AUTH_USER,
                  payload: user
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getUser = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/' + id.toString(), {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
        .then(user =>
              dispatch({
                  type: GET_USER,
                  payload: user
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getFollowings = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/'
          + id.toString()
          + '/followings', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then(res => res.json())
        .then(followings =>
              dispatch({
                  type: GET_FOLLOWINGS,
                  payload: followings.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getFollowers = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/'
          + id.toString()
          + '/followers', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then(res => res.json())
        .then(followers =>
              dispatch({
                  type: GET_FOLLOWERS,
                  payload: followers.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getMessagable = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/messagable', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then(res => res.json())
        .then(messagable =>
              dispatch({
                  type: GET_MESSAGABLE,
                  payload: messagable.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const FollowUnfollow = (login_cred, user_id, userType, auth_id) => dispatch => {
    switch (userType) {
    case 'Follow':
        fetch('http://167.99.162.15/api/following', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + login_cred.success.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user_id
            })
        }).then(res => res.json())
            .then(res => console.log('action', res))
            .then(() => {dispatch(getFollowings(login_cred, auth_id));})
            .then(() => {dispatch(getAuthUser(login_cred));})
            .catch((error) => {
                console.error(error);
            });
        break;
    case 'Unfollow':
        fetch('http://167.99.162.15/api/following/destroy', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + login_cred.success.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user_id
            })
        }).then(res => res.json())
            .then(() => {dispatch(getFollowings(login_cred, auth_id));})
            .then(() => {dispatch(getAuthUser(login_cred));})
            .catch((error) => {
                console.error(error);
            });
        break;
    case 'Auth':
        console.log('error: cant (un)follow yourself');
        break;
    default:
        console.log('error: type not found');
    }
};

export const getAllNotifs = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/notifs', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
    }).then(res => res.json())
        .then(notifs =>
              dispatch({
                  type: GET_ALL_NOTIFS,
                  payload: notifs.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getUserNotifs = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/userNotifs', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
    }).then(res => res.json())
        .then(notifs =>
              dispatch({
                  type: GET_USER_NOTIFS,
                  payload: notifs.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getConvoNotifs = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/convoNotifs', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
    }).then(res => res.json())
        .then(notifs =>
              dispatch({
                  type: GET_CONVO_NOTIFS,
                  payload: notifs.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getMojiNotifs = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/mojiNotifs', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
    }).then(res => res.json())
        .then(notifs =>
              dispatch({
                  type: GET_MOJI_NOTIFS,
                  payload: notifs.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const destroyNotif = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/notif/destroy', {
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
        .then(() => {dispatch(getAllNotifs(login_cred));})
        .then(() => {dispatch(getUserNotifs(login_cred));})
        .then(() => {dispatch(getConvoNotifs(login_cred));})
        .then(() => {dispatch(getMojiNotifs(login_cred));})
        .catch((error) => {
            console.error(error);
        });
};

export const getCollec = (login_cred) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/collec', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
    }).then(res => res.json())
        .then(collec =>
              dispatch({
                  type: GET_COLLEC,
                  payload: collec.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getPubMojis = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/'
          + id.toString()
          + '/pubMojis', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then(res => res.json())
        .then(pubMojis =>
              dispatch({
                  type: GET_PUB_MOJIS,
                  payload: pubMojis.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const getPriMojis = (login_cred, id) => dispatch => {
    return fetch('http://167.99.162.15/api/users/auth/priMojis', {
              method: 'POST',
              headers: {
                  'Authorization': 'Bearer ' + login_cred.success.token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
          }).then(res => res.json())
        .then(priMojis =>
              dispatch({
                  type: GET_PRI_MOJIS,
                  payload: priMojis.data
              })
             )
        .catch((error) => {
            console.error(error);
        });
};

export const searchUser = (login_cred, username) => dispatch => {
    fetch('http://167.99.162.15/api/users/search', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + login_cred.success.token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username
        })
    }).then(res => res.json())
        .then(user =>
              dispatch({
                  type: SEARCH_USER,
                  payload: user
              })
             )
        .catch((error) => {
            console.error(error);
        });
    
};

export const setUserSearchBody = (text) => dispatch => {
    dispatch({
        type: SET_USER_SEARCH_BODY,
        payload: text
    });
};

