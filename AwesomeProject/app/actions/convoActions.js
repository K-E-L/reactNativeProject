// import: types
import {
    GET_CONVOS,
    GET_CONVO
} from '../types';

export const getConvos = (login_cred) => dispatch => {
    fetch('http://178.128.177.180/api/convos', {
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
    fetch('http://178.128.177.180/api/convos/' + id, {
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

