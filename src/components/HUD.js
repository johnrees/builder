import React from 'react'
import { connect } from 'react-redux'
import { buildingAreaSelector, bayCountSelector, roofingAreaSelector, roofingTotalSelector } from '../selectors/building'

class HUD extends React.Component {

  render() {
    return(
      <div id='hud'>
        <p>floor area: {this.props.area.toFixed(1)}m²</p>

        <p>roof: {this.props.roofArea.toFixed(1)}m² / £{parseInt(this.props.roofTotal, 10)}</p>

        <p>bays: {this.props.bayCount}</p>
        <p>total: £{this.props.total.toFixed(2)}</p>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  total: state.costs.total,
  area: buildingAreaSelector(state),
  roofArea: roofingAreaSelector(state),
  roofTotal: roofingTotalSelector(state),
  bayCount: bayCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HUD)
