const data = (state = {
  id: 0,
  site: [],
  static_map: "",
  costings: {
    total: 0,
    categories: []
  }
}, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload
    default:
      return state
  }
}

export default data
