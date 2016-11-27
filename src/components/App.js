import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import HUD from './HUD'
import Building from './Building'
import Controls from './Controls'

const OrbitControls = require('three-orbit-controls')(THREE)

export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      cubeRotation: new THREE.Euler(),
    }

    this.cameraPosition = new THREE.Vector3(5, 5, 5)
  }

  componentWillMount() {
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera, document.getElementById('root'))
    controls.minPolarAngle = Math.PI/6
    controls.maxPolarAngle = Math.PI/2.1
    controls.maxDistance = 9
    controls.minDistance = 4
    this.controls = controls
  }

  componentWillUnmount() {
    delete this.controls
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <div id="container">
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          antialias={true}
          clearColor={0xF6F6F6}>
          <scene>
            <perspectiveCamera
              name="camera"
              ref="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              position={this.cameraPosition}
            />
            <Controls store={this.props.store} />
            <Building store={this.props.store} />
          </scene>
        </React3>
        <HUD store={this.props.store} />
      </div>
    )
  }
}
