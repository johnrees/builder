import React from 'react'
import { connect } from 'react-redux'

class HUD extends React.Component {

  render() {
    return(
      <div id='hud'>
        <p>area: {this.props.area}</p>
        <p>total: {this.props.total}</p>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  total: state.costs.total,
  area: state.building.length
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HUD)
