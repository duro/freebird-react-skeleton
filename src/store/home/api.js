import fetch from 'isomorphic-fetch'
import { List } from 'immutable'
import Thing from './thing-model'

const HOSTNAME = process.env.REACT_APP_FREEBIRD_API_HOSTNAME

export const fetchThings = () => {
  return fetch(`http://${HOSTNAME}/things.json`)
    .then((res) => res.json())
    .then((payload) =>
      List(payload).map((thing) => new Thing(thing))
    )
}
