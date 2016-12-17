import axios from 'axios'
import { List } from 'immutable'
import Thing from './thing-model'

export const fetchThings = () => {
  return axios.get('/things.json')
    .then((res) =>
      List(res.data).map((thing) => new Thing(thing))
    )
}
