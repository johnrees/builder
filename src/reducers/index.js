import { combineReducers } from 'redux'
import building from './building'
import data from './data'
import frame from './frame'

export default combineReducers({
  data, frame, building
})
