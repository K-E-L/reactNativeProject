import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import convoReducer from './convoReducer';
import navReducer from './navReducer';
// import navReducer from './nav';

// Combine all the reducers
export default combineReducers({
    authReducer,
    userReducer,
    convoReducer,
    
    navReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
