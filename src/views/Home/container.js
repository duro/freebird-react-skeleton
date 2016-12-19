import { connect } from 'react-redux'

import { fetchThings } from '../../store/home/duck'

import HomeComponent from './component'

const HomeContainer = connect(
  // Map state to props
  (state) => ({
    phase: state.home.get('phase'),
    things: state.home.get('things'),
    error: state.home.get('error')
  }),
  // Map actions to dispatch and props
  { fetchThings }
)(HomeComponent)

export default HomeContainer
