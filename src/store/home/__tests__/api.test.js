import nock from 'nock'
import { List } from 'immutable'

import * as api from '../api'
import Thing from '../thing-model'
import { HTTP_200 } from '../../../constants/http'

const { API_HOSTNAME } = process.env

describe('home API', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  it('fetches things', () => {
    const expectedThings = [
      { 'id': 1, 'title': 'Thing #1', 'description': 'This thing is super cool' },
      { 'id': 2, 'title': 'Thing #2', 'description': 'This thing is super super cool' },
      { 'id': 3, 'title': 'Thing #3', 'description': 'This thing is super mega cool' }
    ]

    nock(`http://${API_HOSTNAME}`)
      .get('/things.json')
      .reply(HTTP_200, expectedThings)

    return api.fetchThings()
      .then((payload) => {
        expect(payload).toBeInstanceOf(List)
        // eslint-disable-next-line max-nested-callbacks
        payload.forEach((thing, idx) => {
          expect(thing).toBeInstanceOf(Thing)
          expect(thing.toJS()).toEqual(expectedThings[idx])
        })
      })
  })
})
