import { connect } from 'react-redux'

import { windowResized } from '../../store/app/duck'

import AppComponent from './component'

const AppContainer = connect(
  // Map state to props
  (state) => ({
    windowWidth: state.app.windowWidth,
    windowHeight: state.app.windowHeight
  }),
  // Map actions to dispatch and props
  {
    windowResized
  }
)(AppComponent)

export default AppContainer
