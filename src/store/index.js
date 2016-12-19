import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import app from './app/duck'
import home, { homeEpic } from './home/duck'

// Epics
const epics = combineEpics(
  homeEpic
)

// Define Middleware
const middleware = [
  thunk,
  promise(),
  createEpicMiddleware(epics)
]


// Define Reducers
const reducers = combineReducers({
  app,
  home
})

// Create Store
export default createStore(reducers, {}, applyMiddleware(...middleware))
