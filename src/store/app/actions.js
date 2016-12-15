import * as actionTypes from './constants'

/**
 * Set the window width/height
 * @param  {number} width  The width of the window
 * @param  {number} height The height of the window
 * @return {object}        Type: WINDOW_RESIZE, Payload: { width, height }
 */
export const windowResized = (width, height) => {
  return {
    type: actionTypes.WINDOW_RESIZE,
    payload: { width, height }
  }
}
