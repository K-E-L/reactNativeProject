import {
    GET_NAV_USER_STACK,
    POP_NAV_USER,
    PUSH_NAV_USER,
} from '../types';

import { getFollowings } from './userActions';

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
