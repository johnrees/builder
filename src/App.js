import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'

export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      cubeRotation: new THREE.Euler(),
    }

    this._onAnimate = this._onAnimate.bind(this)
  }

  _onAnimate() {
    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.1,
        this.state.cubeRotation.y + 0.1,
        0
      ),
    })
  }

  componentDidMount() {
    this.cameraPosition = new THREE.Vector3(0, 0, 5)
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this._onAnimate}>
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}

            position={this.cameraPosition}
          />
          <mesh
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshBasicMaterial
              color={0x00ff00}
            />
          </mesh>
        </scene>
      </React3>
    )
  }
}
