import { Record, List } from 'immutable'

import reducer, {
  fetchThings,
  FETCH_THINGS,
  FETCH_THINGS_SUCCESS,
  FETCH_THINGS_ERROR
} from '../duck'
import * as phases from '../../../constants/phase'
import Thing from '../thing-model'

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
      new Thing({ id: 1, title: 'The Title', description: 'A description' }),
      new Thing({ id: 2, title: 'Another Title', description: 'Another description' }),
      new Thing({ id: 3, title: 'One More Title', description: 'One More description' })
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
