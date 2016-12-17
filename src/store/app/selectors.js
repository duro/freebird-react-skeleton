/**
 * Get the window size
 * @param  {object} state The global redux state
 * @return {ImmutableMap} A map with width/height of window
 */
export const windowSizeSelector = (state) => state.app.get('window')
