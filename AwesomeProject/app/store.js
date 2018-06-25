import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../app/reducers/root'; //Import the reducer

// const initialState = {};
const middleware = [thunk];

// Connect our store to the root reducer
export default createStore(
    rootReducer,
    // initialState,
    applyMiddleware(...middleware)
);
