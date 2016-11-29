import axios from 'axios'

export const setData = (data) => {
  return { type: 'SET_DATA', payload: data }
}

export const getData = () => {
  return (dispatch) => {
    let id = window.location.hash.match(/\d+/)[0]
    axios.get(`${process.env.REACT_APP_API_HOST}/p/${id}.json`)
      .then((response) => {
        dispatch(setData(response.data))
      }).catch((error) => {
        console.log(error);
      })
  }
}

export const setHasRoom = (payload) => {
  return {
    type: "SET_HAS_ROOM",
    payload: payload
  }
}
export const setRoomPosition = (payload) => {
  return {
    type: "SET_ROOM_POSITION",
    payload: payload
  }
}

export const setLength = (payload) => {
  return {
    type: "SET_LENGTH",
    payload: payload
  }
}

export const setFrameHeight = (payload) => {
  return {
    type: "SET_FRAME_HEIGHT",
    payload: payload
  }
}

export const setFrameWidth = (payload) => {
  return {
    type: "SET_FRAME_WIDTH",
    payload: payload
  }
}

export const setRoofing = (payload) => {
  return {
    type: "SET_ROOFING",
    payload: payload
  }
}

export const setCladding = (payload) => {
  return {
    type: "SET_CLADDING",
    payload: payload
  }
}
