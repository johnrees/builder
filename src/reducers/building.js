// import undoable from 'redux-undo'

const building = (state = {
  roofing: "EPDM",
  cladding: "LARCH",
  length: 5.0,
  hasRoom: false,
  roomPosition: 2
}, action) => {
  switch(action.type) {
    case 'SET_LENGTH':
      return { ...state, length: action.payload }
    case 'SET_ROOFING':
      return { ...state, roofing: action.payload }
    case 'SET_CLADDING':
      return { ...state, cladding: action.payload }
    case 'SET_HAS_ROOM':
      return { ...state, hasRoom: action.payload }
    case 'SET_ROOM_POSITION':
      return { ...state, roomPosition: action.payload }
    default:
      return state
  }
}

// export default undoable(building)
// const undoableBuilding = undoable(building)

export default building
