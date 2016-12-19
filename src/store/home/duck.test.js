import nock from 'nock'
import { Record, List } from 'immutable'
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware } from 'redux-observable'

import reducer, {
  fetchThings,
  homeEpic,
  FETCH_THINGS,
  FETCH_THINGS_SUCCESS,
  FETCH_THINGS_ERROR
} from './duck'
import { HTTP_200 } from '../../constants/http'
import * as phases from '../../constants/phase'
import Thing from './thing-model'

const HOSTNAME = process.env.REACT_APP_FREEBIRD_API_HOSTNAME

describe('home actions', () => {
  it('creates an action to fetch things', () => {
    const expectedAction = {
      type: FETCH_THINGS
    }
    expect(fetchThings()).toEqual(expectedAction)
  })
})

describe('home reducer', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toBeInstanceOf(Record)
    expect(state.phase).toBe(phases.INIT)
    expect(state.things).toBeInstanceOf(List)
    expect(state.error).toBe(null)
  })

  it('handles a fetch things action', () => {
    const fetchThingsAction = {
      type: FETCH_THINGS
    }
    const state = reducer(undefined, fetchThingsAction)
    expect(state.phase).toBe(phases.LOADING)
  })

  it('handles a fetch things success action', () => {
    const things = List([
      new Thing({id: 1, title: 'The Title', description: 'A description'}),
      new Thing({id: 2, title: 'Another Title', description: 'Another description'}),
      new Thing({id: 3, title: 'One More Title', description: 'One More description'})
    ])
    const fetchThingsSuccessAction = {
      type: FETCH_THINGS_SUCCESS,
      payload: { things }
    }
    const state = reducer(undefined, fetchThingsSuccessAction)
    expect(state.phase).toEqual(phases.SUCCESS)
    expect(state.things).toBe(things)
    expect(state.error).toEqual(null)
  })

  it('handles a fetch things error action', () => {
    const error = new Error('Something blew up')
    const fetchThingsErrorAction = {
      type: FETCH_THINGS_ERROR,
      payload: { error }
    }
    const state = reducer(undefined, fetchThingsErrorAction)
    expect(state.phase).toEqual(phases.ERROR)
    expect(state.things).toBeInstanceOf(List)
    expect(state.error).toEqual(error)
  })
})

describe('home epics', () => {
  let store

  const epicMiddleware = createEpicMiddleware(homeEpic)
  const mockStore = configureMockStore([epicMiddleware])

  beforeEach(() => {
    store = mockStore()
  })

  afterEach(() => {
    nock.cleanAll()
    epicMiddleware.replaceEpic(homeEpic)
  })

  it.skip('fetches things', () => {
    // TODO: It would seem that Epics themselves cannot be tested right now
    // since there is nowhere that returns a promise, which is what Jest
    // expects to have returned from this function in order to know to wait for
    // some async behavior to finish before it moves on to the next test
    // SEE: https://github.com/redux-observable/redux-observable/issues/144

    const expectedThings = [
      {'id': 1, 'title': 'Thing #1', 'description': 'This thing is super cool'},
      {'id': 2, 'title': 'Thing #2', 'description': 'This thing is super super cool'},
      {'id': 3, 'title': 'Thing #3', 'description': 'This thing is super mega cool'}
    ]

    nock(`http://${HOSTNAME}`)
      .get('/things.json')
      .reply(HTTP_200, expectedThings)

    store.dispatch(fetchThings())

    expect().toEqual([
      { type: FETCH_THINGS },
      { type: FETCH_THINGS_SUCCESS, payload: expectedThings}
    ])
  })
})
