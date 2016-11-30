import React from 'react'
import THREE from 'three'
import { DEGS_TO_RADS } from '../libs/SVG'

export default class GridPlane extends React.Component {
  componentWillMount() {
    this.rotation = new THREE.Euler(270*DEGS_TO_RADS,0,0)
    this.position = new THREE.Vector3(0,-0.1,0)
  }
  render() {
    return (
      <mesh rotation={this.rotation} position={this.position} receiveShadow={false} >
        <meshBasicMaterial color={0xCCCCCC} wireframe={true} side={THREE.DoubleSide} />
        <planeGeometry width={14} height={14} widthSegments={24} heightSegments={24} />
      </mesh>
    )
  }
}
