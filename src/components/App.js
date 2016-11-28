import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import Stats from 'stats.js'
import HUD from './HUD'
import Building from './Building'
import Controls from './Controls'
import Box from './Box'
import GroundPlane from './GroundPlane'
import LensButtons from './LensButtons'
import TWEEN from 'tween.js'

const OrbitControls = require('three-orbit-controls')(THREE)

export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context)
    // this.state = {
    //   cubeRotation: new THREE.Euler()
    // }

    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    this.cameraPosition = new THREE.Vector3(5, 5, 5)

    this.clippingHeight = 2.5
    this.clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), this.clippingHeight)
    this.spotlightPosition = new THREE.Vector3(-20,20,10)
    this.spotlightLookAt = new THREE.Vector3(0,1,0)
    this.ambientLightPosition = new THREE.Vector3(0,5,0)

    this._onAnimate = this._onAnimate.bind(this)
    this.getRenderer = this.getRenderer.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.setMesh = this.setMesh.bind(this)
    this.setClippingHeight = this.setClippingHeight.bind(this)
    this.setLens = this.setLens.bind(this)
  }

  _onAnimate() {
    this.stats.update()
    TWEEN.update()
  }

  setClippingHeight(value) {
    if (this.clippingPlane) {
      this.clippingPlane.constant = value
    }
  }

  setLens(lens) {
    let tween;
    switch(lens) {
      case "GROUND":
        tween = new TWEEN.Tween(this.clippingPlane)
        tween.to({ constant: -0.08 }, 100)
        tween.start()
        break
      case "BASIC":
        tween = new TWEEN.Tween(this.clippingPlane)
        tween.to({ constant: 2.5 }, 200)
        tween.start()
        break
      case "CROSS":
        tween = new TWEEN.Tween(this.clippingPlane)
        tween.to({ constant: 1.0 }, 200)
        tween.start()
        break
      default:
        this.setClippingHeight(this.clippingHeight)
        break
    }
  }

  getRenderer(renderer) {
    this.renderer = renderer
    renderer.clippingPlanes = [this.clippingPlane]
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
          shadowMapEnabled={true}
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
              lookAt={this.spotlightLookAt}
            />
            <ambientLight position={this.ambientLightPosition} intensity={1} />
            <spotLight position={this.spotlightPosition} lookAt={this.spotlightLookAt} castShadow={true} intensity={0.3} />
            <Building store={this.props.store} setMesh={this.setMesh} />
            <GroundPlane store={this.props.store} />
          </scene>
        </React3>
        <HUD store={this.props.store} />
        <Controls store={this.props.store} clippingHeight={this.clippingHeight} setClippingHeight={this.setClippingHeight} ref='controls' />
        <LensButtons setLens={this.setLens} />
      </div>
    )
  }
}
