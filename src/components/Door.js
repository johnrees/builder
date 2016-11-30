import React from 'react'

export default class Door extends React.Component {
  // componentDidMount() {
  //   this.refs.material.clippingPlanes= [this.props.clippingPlane]
  // }
  render() {
    return (
      <mesh position={this.props.position}>
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.length} />
        <meshBasicMaterial color={this.props.color} />
      </mesh>
    )
  }
}
