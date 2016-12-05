import Immutable from 'immutable'

/**
 * Private: Initial State
 */

const initialState = Immutable.fromJS({
  window: {
    width: 0,
    height: 0
  }
})

/**
 * Public: Action Types
 */

export const actionTypes = {
  WINDOW_RESIZE: 'FB/app/WINDOW_RESIZE'
}

/**
 * Public: Action Creators
 */

export const windowResized = (width, height) => {
  return {
    type: actionTypes.WINDOW_RESIZE,
    payload: { width, height }
  }
}

/**
 * Public: Reducer
 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case actionTypes.WINDOW_RESIZE: {
      const { width, height } = action.payload
      return state.mergeIn(['window'], { width, height })
    }

    default: {
      return state
    }

  }
}
