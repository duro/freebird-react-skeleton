import fetch from 'isomorphic-fetch'
import { List } from 'immutable'

import Thing from './thing-model'

const { API_HOSTNAME } = process.env

export const fetchThings = () => {
  return fetch(`http://${API_HOSTNAME}/things.json`)
    .then((res) => res.json())
    .then((payload) =>
      List(payload).map((thing) => new Thing(thing))
    )
}
