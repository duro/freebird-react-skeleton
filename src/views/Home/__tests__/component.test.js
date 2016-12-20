import React from 'react'
import { shallow } from 'enzyme'
import { List } from 'immutable'

import Home from '../component'
import Thing from '../../../store/home/thing-model'
import { INIT, SUCCESS, ERROR } from '../../../constants/phase'

const listOfThings = List(
  [ { id: 1, title: 'Thing #1', description: 'This thing is super cool' },
    { id: 2, title: 'Thing #2', description: 'This thing is super super cool' },
    { id: 3, title: 'Thing #3', description: 'This thing is super mega cool' } ]
      .map((thing) => new Thing(thing))
)

it('renders without crashing', () => {
  shallow(
    <Home
      phase={ INIT }
      things={ List() }
      fetchThings={() => {}}
    />
  )
})

it('renders things', () => {
  const component = shallow(
    <Home
      phase={ SUCCESS }
      things={ listOfThings }
      fetchThings={() => {}}
    />
  )

  expect(component.find('.Home-thingsContainer').length).toBe(1)
  expect(component.find('.Home-errorContainer').length).toBe(0)
})

it('renders an error', () => {
  const errMsg = 'There was an error'
  const component = shallow(
    <Home
      phase={ ERROR }
      things={ List() }
      fetchThings={() => {}}
      error={ new Error(errMsg) }
    />
  )

  expect(component.find('.Home-thingsContainer').length).toBe(0)
  expect(component.find('.Home-errorContainer').length).toBe(1)
  expect(component.find('.Home-errorContainer').text()).toContain(errMsg)
})

it('fetches things on mount when they are not loaded', () => {
  const fetchThingsMock = jest.fn()

  shallow(
    <Home
      phase={ INIT }
      things={ List() }
      fetchThings={ fetchThingsMock }
    />
  )

  expect(fetchThingsMock).toHaveBeenCalled()
})

it('does not fetch things when they are already loaded', () => {
  const fetchThingsMock = jest.fn()

  shallow(
    <Home
      phase={ SUCCESS }
      things={ listOfThings }
      fetchThings={ fetchThingsMock }
    />
  )

  expect(fetchThingsMock).not.toHaveBeenCalled()
})
