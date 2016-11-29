import React from 'react'
import { connect } from 'react-redux'
import THREE from 'three'

class Arrows extends React.Component {
  render() {
    let quarterLength = this.props.length/4
    let quarterWidth = this.props.width/4
    let lengthLine = [
      new THREE.Vector3(quarterWidth+0.5,0,-quarterLength),
      new THREE.Vector3(quarterWidth+0.5,0,quarterLength)
    ]
    let widthLine = [
      new THREE.Vector3(-quarterWidth,0,quarterLength+0.5),
      new THREE.Vector3(quarterWidth,0,quarterLength+0.5)
    ]

    return(
      <object3D>
        <line>
          <geometry vertices={lengthLine} />
          <meshBasicMaterial color={0x000000} />
        </line>
        <line>
          <geometry vertices={widthLine} />
          <meshBasicMaterial color={0x000000} />
        </line>
      </object3D>
    )
  }
}

const mapStateToProps = (state) => ({
  length: state.building.length,
  width: state.frame.width
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Arrows)
