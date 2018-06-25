import { combineReducers } from 'redux';
import authReducer from './authReducer';
// import navReducer from './nav';

// Combine all the reducers
export default combineReducers({
    authReducer
    // navReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
