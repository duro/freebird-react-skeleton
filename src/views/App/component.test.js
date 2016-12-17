import React from 'react'
import App from './component'
import { shallow } from 'enzyme'

const windowWidth = 555
const windowHeight = 666

it('renders without crashing', () => {
  shallow(
    <App
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      windowResized={() => {}}
    />
  )
})

it('has navigation', () => {
  const component = shallow(
    <App
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      windowResized={() => {}}
    />
  )

  expect(component.find('.App-mainNav').length).toBe(1)
})
