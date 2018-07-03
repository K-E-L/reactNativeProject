// import: types
import {
    GET_AUTH_USER,
    GET_FOLLOWERS,
    GET_FOLLOWINGS,
    GET_USER
} from '../types';

export const getAuthUser = (login_cred) => dispatch => {
    fetch('http://167.99.162.15/api/users/auth', {
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
    fetch('http://167.99.162.15/api/users/' + id.toString(), {
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
    fetch('http://167.99.162.15/api/users/'
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
    fetch('http://167.99.162.15/api/users/'
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

export const FollowUnfollow = (userType, id, login_cred) => dispatch => {
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
                id: id
            })
        }).then(res => res.json())
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
                id: id
            })
        }).then(res => res.json())
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
