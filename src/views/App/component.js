import React, { Component, PropTypes } from 'react'
import { Match, Link } from 'react-router'

import Home from '../Home/container'
import About from '../About/container'

import logo from './logo.svg'
import './styles.scss'

export default class App extends Component {

  static propTypes = {
    windowResized: PropTypes.func.isRequired,
    windowWidth: PropTypes.number.isRequired,
    windowHeight: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.handleResize = this.onResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  onResize(/* event */) {
    this.props.windowResized(window.innerWidth, window.innerHeight)
  }

  render() {
    const { windowWidth, windowHeight } = this.props

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-windowInfo">
          Window Width: { windowWidth } / Window Height: { windowHeight }
        </p>
        <nav className="App-mainNav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <div className="App-pageContainer">
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />
        </div>
      </div>
    )
  }
}
