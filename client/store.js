import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
// import petReducer from './reducers/petSlice';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/combineReducers';

// const store = configureStore({
//     reducer: reducers
// });

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;