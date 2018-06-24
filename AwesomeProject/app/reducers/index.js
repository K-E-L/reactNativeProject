import { combineReducers } from 'redux';
import postReducer from './postReducer';

// Combine all the reducers
export default combineReducers({
    postReducer
    
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});
