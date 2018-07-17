// import: types
import {
    GET_AUTH_USER,
    GET_COLLEC,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_MESSAGABLE,
    GET_NOTIFS,
    GET_PRI_MOJIS,
    GET_PUB_MOJIS,
    GET_USER
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
                  payload: followings
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
                  payload: followers
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
                  payload: messagable
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

export const getNotifs = (login_cred) => dispatch => {
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
                  type: GET_NOTIFS,
                  payload: notifs
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
        .then(() => {dispatch(getNotifs(login_cred));})
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
                  payload: collec
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
                  payload: pubMojis
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
                  payload: priMojis
              })
             )
        .catch((error) => {
            console.error(error);
        });
};
