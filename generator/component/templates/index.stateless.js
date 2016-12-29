import React /*, { PropTypes }*/ from 'react'

import './styles.scss'

const COMPONENT_CLASSNAME = '<%= projectCSSPrefix %>-<%= componentName %>'

const propTypes = {
  // PropTypes go here
}

const defaultProps = {
  // Default Props go here
}

const <%= componentName %> = (/* { // Destructure props here } */) => {

  return (
    <span className={COMPONENT_CLASSNAME}><%= componentName %></span>
  )
}

<%= componentName %>.propTypes = propTypes
<%= componentName %>.defaultProps = defaultProps

export default <%= componentName %>
