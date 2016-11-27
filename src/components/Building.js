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
          width={1}
          height={1}
          depth={this.props.length} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    )
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length
})

const mapDispatchToProps = (dispatch) => ({
  getCosts: () => { dispatch(getCosts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
