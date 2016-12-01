const frame = (state = {
  width: 3,
  height: 3,
  data: [
  ]
}, action) => {
  switch(action.type) {
    case 'SET_FRAME_DATA':
      return { ...state, data: action.payload }
    case 'SET_FRAME_WIDTH':
      return { ...state, width: action.payload }
    case 'SET_FRAME_HEIGHT':
      return { ...state, height: action.payload }
    default:
      return state
  }
}

export default frame
