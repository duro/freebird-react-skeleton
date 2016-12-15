import { connect } from 'react-redux'
import { windowResized } from '../../store/app/actions'
import { windowSizeSelector } from '../../store/app/selectors'
import AppComponent from './component'

const AppContainer = connect(
  // Map state to props
  (state) => ({
    windowSize: windowSizeSelector(state)
  }),
  // Map actions to dispatch and props
  {
    windowResized
  }
)(AppComponent)

export default AppContainer
