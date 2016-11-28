import { combineReducers } from 'redux'
import building from './building'
import costs from './costs'
import frame from './frame'

export default combineReducers({
  costs, frame, building
})
