import { Record } from 'immutable'

/**
 * Public: Action Types
 */

export const WINDOW_RESIZE = 'freebird/app/WINDOW_RESIZE'

/**
 * Private: Initial State
 */

const InitialState = new Record({
  windowHeight: 0,
  windowWidth: 0
})

const toInitialState = (state) => new InitialState({ ...state })

/**
 * Public: Reducer
 */

export default function reducer(state = new InitialState(), action = {}) {
  if (!(state instanceof InitialState)) return toInitialState(state)

  switch (action.type) {

    case WINDOW_RESIZE:
      return state
        .set('windowWidth', action.payload.windowWidth)
        .set('windowHeight', action.payload.windowHeight)

    default: {
      return state
    }

  }
}

/**
 * Public: Action Creators
 */

/**
 * Set the window width/height
 * @param  {number} windowWidth  The width of the window
 * @param  {number} windowHeight The height of the window
 * @return {object} Type: WINDOW_RESIZE, Payload: { width, height }
 */
export const windowResized = (windowWidth, windowHeight) => {
  return {
    type: WINDOW_RESIZE,
    payload: { windowWidth, windowHeight }
  }
}
