// import: types
import {
    GET_COMMENT_REPLIES,
} from '../types';

export const getCommentReplies = (login_cred, id) => dispatch => {
    fetch('http://167.99.162.15/api/comments/' +
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
