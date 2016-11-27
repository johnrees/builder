import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import Stats from 'stats.js'
import HUD from './HUD'
import Building from './Building'
import Controls from './Controls'
import Box from './Box'

const OrbitControls = require('three-orbit-controls')(THREE)

export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      cubeRotation: new THREE.Euler(),
    }

    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    this.cameraPosition = new THREE.Vector3(5, 5, 5)

    this._onAnimate = this._onAnimate.bind(this)
    this.getRenderer = this.getRenderer.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.setMesh = this.setMesh.bind(this)
  }

  _onAnimate() {
    this.stats.update()
  }

  getRenderer(renderer) {
    this.renderer = renderer
  }

  componentWillMount() {
  }

  onWindowResize() {
    this.refs.camera.aspect = window.innerWidth / window.innerHeight
    this.refs.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  onMouseMove(event) {
    // // console.log(event)
    // this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    // this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
  }

  onMouseDown(event) {
    this.mouse.x = ( event.clientX / this.renderer.domElement.width ) * 2 - 1
    this.mouse.y = - ( event.clientY / this.renderer.domElement.height ) * 2 + 1
    this.raycaster.setFromCamera( this.mouse, this.refs.camera )
    // console.log(this.buildingMesh)
    let intersects = this.raycaster.intersectObjects([this.buildingMesh])
    if (intersects.length > 0) {
      console.log(intersects[0] )
      // intersects[0].face.materialIndex = 1
      // intersects[0].object.geometry.colorsNeedUpdate = true
    }
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera, document.getElementById('root'))
    controls.minPolarAngle = Math.PI/6
    controls.maxPolarAngle = Math.PI/2.1
    controls.maxDistance = 9
    controls.minDistance = 4
    this.controls = controls

    this.stats = new Stats()
    const container = document.getElementById('root')
    container.appendChild(this.stats.domElement)

    window.addEventListener( 'resize', this.onWindowResize, false )
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mousemove', this.onMouseMove, false )
  }

  componentWillUnmount() {
    this.refs.controls.gui.destroy()
    delete this.controls
    delete this.stats
  }

  setMesh(mesh) {
    this.buildingMesh = mesh
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
          onAnimate={this._onAnimate}
          onRendererUpdated={this.getRenderer}
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
            <Controls store={this.props.store} ref='controls' />
            <Building store={this.props.store} setMesh={this.setMesh} />
          </scene>
        </React3>
        <HUD store={this.props.store} />
      </div>
    )
  }
}
