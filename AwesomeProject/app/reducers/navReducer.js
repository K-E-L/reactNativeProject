// import {
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';
// import { TabNavigator } from '../components/navComponent';

// const navReducer = createNavigationReducer(TabNavigator);

// export default navReducer;

// import: types
import {
    STACK_HISTORY
} from '../types';

const initialState = {
    stackHistory: ['root'],
    
};

function navReducer (state = initialState, action) {
    switch (action.type) {
    case STACK_HISTORY:
        console.log('stackHistory: ', state.stackHistory);
        return {
            ...state,
            // followings: action.payload
            stackHistory: [
                ...state.stackHistory,
                action.payload
            ]
        };
        
    default:
        return state;
    }
};

export default navReducer;

