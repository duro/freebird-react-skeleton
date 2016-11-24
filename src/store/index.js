import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import app from './app';

// Define Middleware
const middleware = [
  thunk,
  promise()
];

// Define Reducers
const reducers = combineReducers({
  app
});

// Create Store
export default createStore(reducers, {}, applyMiddleware(...middleware));
