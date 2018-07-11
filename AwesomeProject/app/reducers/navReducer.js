// import: types
import {
    GET_NAV_USER_STACK,
    POP_NAV_USER,
    PUSH_NAV_USER
} from '../types';

const initialState = {
    userStack: []
};

function navReducer (state = initialState, action) {
    switch (action.type) {
    case PUSH_NAV_USER:
        return {
            ...state,
            userStack: [...state.userStack, action.payload]
        };

    case POP_NAV_USER:
        console.log('popped');
        return {
            ...state,
            userStack: state.userStack.slice(0, (state.userStack.length - 1))
        };

    default:
        return state;
    }
};

export default navReducer;
