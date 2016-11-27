import React from 'react'
import { connect } from 'react-redux'
import { getCosts } from '../actions'
import { claddingColorSelector } from '../selectors/building'

class Building extends React.Component {

  componentWillMount() {
    this.props.getCosts()
  }

  render() {
    return (
      <mesh position={this.props.position}>
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.length} />
        <meshBasicMaterial color={this.props.claddingColor} />
      </mesh>
    )
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length,
  width: state.frame.width,
  height: state.frame.height,
  claddingColor: claddingColorSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getCosts: () => { dispatch(getCosts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
