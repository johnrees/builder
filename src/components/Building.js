import React from 'react'
import { connect } from 'react-redux'

class Building extends React.Component {

  render() {
    console.log(this.props)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
