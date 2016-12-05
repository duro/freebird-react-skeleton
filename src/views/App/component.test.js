import React from 'react'
import App from './component'
import Immutable from 'immutable'
import { MemoryRouter } from 'react-router'
import { shallow, mount } from 'enzyme'

const windowSize = Immutable.fromJS({
  width: 555,
  height: 666
})

it('renders without crashing', () => {
  shallow(<App windowSize={windowSize} windowResized={() => {}} />)
})

it('has navigation', () => {
  const component = shallow(<App windowSize={windowSize} windowResized={() => {}} />)

  expect(component.find('.App-mainNav').length).toBe(1)
})

it('has expected navigation links', () => {
  const component = mount(
    <MemoryRouter>
      <App windowSize={windowSize} windowResized={() => {}} />
    </MemoryRouter>
  )

  const expectedNavLinks = ['Home', 'About']
  const navText = component.find('.App-mainNav').text()

  expectedNavLinks.forEach((linkText) => {
    expect(navText).toContain(linkText)
  })
})
