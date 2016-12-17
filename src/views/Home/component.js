import React, { PureComponent, PropTypes } from 'react'
import IPT from 'react-immutable-proptypes'

import { SUCCESS, ERROR } from '../../constants/phase'
import Thing from '../../store/home/thing-model'
import './styles.scss'

export default class Home extends PureComponent {

  static propTypes = {
    fetchThings: PropTypes.func.isRequired,
    phase: PropTypes.string.isRequired,
    things: IPT.listOf(PropTypes.instanceOf(Thing)).isRequired,
    error: PropTypes.object
  }

  componentWillMount() {
    const { phase, fetchThings } = this.props
    if (phase !== SUCCESS) {
      fetchThings()
    }
  }

  render() {
    const { things, phase, error } = this.props

    return (
      <div>
        <h1>Home</h1>
        { (phase !== ERROR) ?
        <ul className="Home-thingsContainer">
          { things.map((thing) => (
            <li key={ thing.id }>
              <span>{ thing.title }</span>
              <ul>
                <li>{ thing.description }</li>
              </ul>
            </li>
          )) }
        </ul>
        :
        <div className="Home-errorContainer">
          <p>We got an error</p>
          <p>{ error.message }</p>
        </div>
        }
      </div>
    )
  }
}
