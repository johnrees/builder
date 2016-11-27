import React from 'react'

export default class Box extends React.Component {
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
