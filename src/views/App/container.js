import { connect } from 'react-redux'
import { windowResized } from '../../store/app'
import AppComponent from './component'

const AppContainer = connect(
  // Map state to props
  (state) => ({
    windowSize: state.app.get('window')
  }),
  // Map actions to dispatch and props
  {
    windowResized
  }
)(AppComponent)

export default AppContainer
