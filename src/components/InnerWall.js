import React from "react"
import THREE from 'three'
// import { connect } from "react-redux"

class InnerWall extends React.Component {

  componentDidMount() {
    // this.refs.material.clippingPlanes= [this.props.clippingPlane]
  }

  render() {
    return false
    return (
      <mesh position={this.props.position}>
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.length} />
        <meshPhongMaterial color={this.props.color} side={THREE.DoubleSide} ref="material" />
      </mesh>
    )
  }

}


export default InnerWall
