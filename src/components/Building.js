import React from 'react'
import { connect } from 'react-redux'
import { getCosts } from '../actions'

class Building extends React.Component {

  componentWillMount() {
    this.props.getCosts()
  }

  render() {
    return (
      <mesh>
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.length} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    )
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length,
  width: state.frame.width,
  height: state.frame.height
})

const mapDispatchToProps = (dispatch) => ({
  getCosts: () => { dispatch(getCosts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
