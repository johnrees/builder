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
