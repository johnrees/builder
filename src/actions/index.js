import axios from 'axios'

export const setCosts = (data) => {
  return { type: 'SET_COSTS', payload: data }
}

export const getCosts = () => {
  return (dispatch) => {
    axios.get(`${process.env.REACT_APP_API_HOST}/costings.json`)
      .then((response) => {
        dispatch(setCosts(response.data))
      }).catch((error) => {
        console.log(error);
      })
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
