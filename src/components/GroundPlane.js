import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux'
import { DEGS_TO_RADS } from '../libs/SVG'

class GroundPlane extends React.Component {
  componentWillMount() {
    this.rotation = new THREE.Euler(270*DEGS_TO_RADS,0,0)
    this.position = new THREE.Vector3(0,-0.1,0)
    this.mapquestToken = process.env.REACT_APP_MAPQUEST_TOKEN
    this.imgSize = 1024
    this.mapZoom = 18
  }
  render() {
    console.log("MAP")
    // let textureURL = "https://maps.googleapis.com/maps/api/staticmap?center=53.3075188068184,-3.74711036682129&zoom=19&size=512x512&key=AIzaSyDtjm6A_jnLaGU2uA9oHTg6n1YYCmss8P8&path=color:0x00000000|weight:5|fillcolor:0xFFFF0033|53.307368155259276,-3.7472605705261235|53.30756688699132,-3.7473839521408085|53.30766945784595,-3.7469655275344853|53.30745790518829,-3.7468260526657104"
    // `https://www.mapquestapi.com/staticmap/v4/getmap?key=${this.mapquestToken}&type=map&size=${this.imgSize},${this.imgSize}&center=${this.props.latlng}&zoom=${this.mapZoom}`
    if (!this.props.textureURL) { return false }
    return (
      <mesh rotation={this.rotation} position={this.position} receiveShadow={true} >
        <meshBasicMaterial color={0xF6F6F6} wireframe={false} side={THREE.DoubleSide} transparent={true} opacity={0.5}>
          <texture url={this.props.textureURL} />
        </meshBasicMaterial>
        <planeGeometry width={50} height={50} widthSegments={1} heightSegments={1} />
      </mesh>
    )
  }
}

const mapStateToProps = (state) => ({
  textureURL: state.data.static_map
})

export default connect(mapStateToProps)(GroundPlane)
