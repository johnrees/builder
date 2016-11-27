const building = (state = {
  length: 5.0
}, action) => {
  switch(action.type) {
    case 'SET_LENGTH':
      return { ...state, length: action.payload }
    default:
      return state
  }
}

export default building
