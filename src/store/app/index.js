import Immutable from 'immutable'
import * as actionTypes from './constants'

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
