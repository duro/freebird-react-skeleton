import Rx from 'rxjs/Rx'
import { Record, List } from 'immutable'
import { combineEpics } from 'redux-observable'
import * as api from './api'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

/**
 * Public: Action Types
 */

export const FETCH_THINGS = 'freebird/home/FETCH_THINGS'
export const FETCH_THINGS_FULFILLED = 'freebird/home/FETCH_THINGS_FULFILLED'
export const FETCH_THINGS_REJECTED = 'freebird/home/FETCH_THINGS_REJECTED'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  phase: INIT,
  things: List(),
  error: null
})

const toInitialState = (state) => new InitialState({
  ...state,
  things: List(state.things)
})

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {
  if (!(state instanceof InitialState)) return toInitialState(state)

  switch (action.type) {

    case FETCH_THINGS:
      return state.set('phase', LOADING)

    case FETCH_THINGS_FULFILLED:
      return state
        .set('things', action.payload.things)
        .set('phase', SUCCESS)

    case FETCH_THINGS_REJECTED:
      return state
        .set('error', action.payload.error)
        .set('phase', ERROR)

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

export const fetchThings = () => ({
  type: FETCH_THINGS
})

/**
 * Private: Epics
 */

const fetchThingsEpic = (action$) =>
  action$
    .ofType(FETCH_THINGS)
    .mergeMap(api.fetchThings)
    .map((things) => ({
      type: FETCH_THINGS_FULFILLED,
      payload: { things }
    }))
    .catch((error) => Rx.Observable.of({
      type: FETCH_THINGS_REJECTED,
      payload: { error }
    }))

/**
 * Public: Export Epics
 */

export const homeEpic = combineEpics(
  fetchThingsEpic
)
