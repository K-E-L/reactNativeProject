import { combineReducers } from 'redux';
import authReducer from './authReducer';
import commentReducer from './commentReducer';
import convoReducer from './convoReducer';
import mojiReducer from './mojiReducer';
import navReducer from './navReducer';
import userReducer from './userReducer';
// import navReducer from './nav';

// Combine all the reducers
export default combineReducers({
    authReducer,
    userReducer,
    convoReducer,
    mojiReducer,
    commentReducer,
    
    navReducer

    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
