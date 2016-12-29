import React, { PureComponent /*, PropTypes */} from 'react'

import './styles.scss'

const COMPONENT_CLASSNAME = '<%= projectCSSPrefix %>-<%= componentName %>'

export default class <%= componentName %> extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  render() {
    return (
      <span className={COMPONENT_CLASSNAME}><%= componentName %></span>
    )
  }

}
