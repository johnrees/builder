import React from 'react'
import THREE from 'three'
import { DEGS_TO_RADS } from '../libs/SVG'

export default class GroundPlane extends React.Component {
  componentWillMount() {
    this.rotation = new THREE.Euler(270*DEGS_TO_RADS,0,0)
    this.position = new THREE.Vector3(0,-0.1,0)
    this.mapquestToken = process.env.REACT_APP_MAPQUEST_TOKEN
    this.imgSize = 1024
    this.mapZoom = 18
  }
  render() {
    return (
      <mesh rotation={this.rotation} position={this.position} receiveShadow={true} >
        <meshBasicMaterial color={0xF6F6F6} wireframe={false} side={THREE.DoubleSide} transparent={true} opacity={0.5}>
          <texture url={
            `https://www.mapquestapi.com/staticmap/v4/getmap?key=${this.mapquestToken}&type=map&size=${this.imgSize},${this.imgSize}&center=${this.props.latlng}&zoom=${this.mapZoom}`
          } />
        </meshBasicMaterial>
        <planeGeometry width={200} height={200} widthSegments={1} heightSegments={1} />
      </mesh>
    )
  }
}
