const costs = (state = { total: 0 }, action) => {
  switch (action.type) {
    case 'SET_COSTS':
      return action.payload
    default:
      return state
  }
}

export default costs
