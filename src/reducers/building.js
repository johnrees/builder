const building = (state = {
  roofing: "STEEL",
  cladding: "LARCH",
  length: 5.0
}, action) => {
  switch(action.type) {
    case 'SET_LENGTH':
      return { ...state, length: action.payload }
    case 'SET_ROOFING':
      return { ...state, roofing: action.payload }
    case 'SET_CLADDING':
      return { ...state, cladding: action.payload }
    default:
      return state
  }
}

export default building
