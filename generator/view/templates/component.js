import React, { PureComponent /*, PropTypes*/ } from 'react'
// import IPropTypes from 'react-immutable-proptypes'

import './styles.scss'

export default class <%= viewName %>Component extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  render() {
    return (
      <div>
        <h1><%= viewName %></h1>
      </div>
    )
  }
}
