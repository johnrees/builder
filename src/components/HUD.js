import React from 'react'
import { connect } from 'react-redux'
import { buildingAreaSelector } from '../selectors/building'

class HUD extends React.Component {

  render() {
    return(
      <div id='hud'>
        <p>area: {this.props.area.toFixed(1)}m²</p>
        <p>total: £{this.props.total.toFixed(2)}</p>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  total: state.costs.total,
  area: buildingAreaSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HUD)
