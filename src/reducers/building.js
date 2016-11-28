// import undoable from 'redux-undo'

const building = (state = {
  roofing: "EPDM",
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

// export default undoable(building)
// const undoableBuilding = undoable(building)

export default building
