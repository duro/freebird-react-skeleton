import { Record } from 'immutable'

import reducer, { windowResized, WINDOW_RESIZE } from '../duck'

describe('app actions', () => {
  it('creates an action to store Window size', () => {
    const windowWidth = 555
    const windowHeight = 333
    const expectedAction = {
      type: WINDOW_RESIZE,
      payload: {
        windowWidth,
        windowHeight
      }
    }
    expect(
      windowResized(windowWidth, windowHeight)
    )
    .toEqual(expectedAction)
  })
})

describe('app reducer', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, {})
    expect(state).toBeInstanceOf(Record)
    expect(state.windowWidth).toEqual(0)
    expect(state.windowHeight).toEqual(0)
  })

  it('should handle window resize action', () => {
    const windowWidth = 555
    const windowHeight = 333
    const action = {
      type: WINDOW_RESIZE,
      payload: { windowWidth, windowHeight }
    }
    const state = reducer(undefined, action)
    expect(state.windowWidth).toEqual(windowWidth)
    expect(state.windowHeight).toEqual(windowHeight)
  })
})
