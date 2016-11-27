import React from 'react'
import axios from 'axios'

export default class HUD extends React.Component {
  constructor(props, state) {
    super(props, state)
    this.state = {
      area: 50,
      total: 0
    }
    this.setData = this.setData.bind(this)
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_HOST}/costings.json`)
      .then((response) => {
        this.setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  setData(data) {
    console.log(data)
    this.setState({
      total: data.total
    })
  }
  render() {
    return(
      <div id='hud'>
        <p>area: {this.state.area}</p>
        <p>total: {this.state.total}</p>
      </div>
    )
  }
}
