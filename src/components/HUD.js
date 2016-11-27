import React from 'react'
import { connect } from 'react-redux'
import {
  buildingAreaSelector, bayCountSelector, roofingAreaSelector,
  roofingTotalSelector, claddingAreaSelector, claddingTotalSelector } from '../selectors/building'

class HUD extends React.Component {

  render() {
    return(
      <div id='hud'>
        <p>floor area: {this.props.area.toFixed(1)}m²</p>

        <p>roofing: {this.props.roofArea.toFixed(1)}m² / £{parseInt(this.props.roofTotal, 10)}</p>
        <p>cladding: {this.props.claddingArea.toFixed(1)}m² / £{parseInt(this.props.claddingTotal, 10)}</p>

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
  claddingArea: claddingAreaSelector(state),
  claddingTotal: claddingTotalSelector(state),
  bayCount: bayCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HUD)
