import React from 'react'
import Provider from 'react-redux'
import React3 from 'react-three-renderer'
import THREE from 'three'
import Stats from 'stats.js'
import HUD from './HUD'
import Building from './Building'
import Controls from './Controls'
import GroundPlane from './GroundPlane'
import LensButtons from './LensButtons'
import Arrows from './Arrows'
import Balls from './Balls'
import TWEEN from 'tween.js'
import {frame} from '../blueprint'

const OrbitControls = require('three-orbit-controls')(THREE)

export default class Simple extends React.Component {
  constructor(props, context) {
    super(props, context)
    window.showFrames = false

    // console.log(frame(3,4))
    // this.state = {
    //   cubeRotation: new THREE.Euler()
    // }

    this.cameraPosition = new THREE.Vector3(5, 5, 5)

    this.clippingHeight = 2.5
    this.clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), this.clippingHeight)
    this.spotlightPosition = new THREE.Vector3(-20,20,10)
    this.spotlightLookAt = new THREE.Vector3(0,1,0)
    this.ambientLightPosition = new THREE.Vector3(0,5,0)

    this.balls = []
    this.dragDirection = this.SELECTED = this.INTERSECTED = null
    this.previousY = this.previousX = 0
    this.MOUSE_STATE = "UP"
    this.intersection = this.offset = new THREE.Vector3()
    this.plane = new THREE.Plane()
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()

    this._onAnimate = this._onAnimate.bind(this)
    this.getRenderer = this.getRenderer.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.setMesh = this.setMesh.bind(this)
    this.setClippingHeight = this.setClippingHeight.bind(this)
    this.setLens = this.setLens.bind(this)
    this.switchControls = this.switchControls.bind(this)
    this.addBall = this.addBall.bind(this)
  }

  addBall(ball) {
    // console.log("aaaaaa")
    // console.log(ball)
    this.balls.push(ball)
  }

  _onAnimate() {
    this.stats.update()
    TWEEN.update()
    this.controls.update()
  }

  setClippingHeight(value) {
    if (this.clippingPlane) {
      this.clippingPlane.constant = value
    }
  }

  switchControls(lock2D) {
    if (lock2D) {
      this.refs.camera.position.set(0,10,0)
      this.controls.minPolarAngle = 0
      this.controls.maxPolarAngle = 0
    } else {
      this.controls.minPolarAngle = Math.PI/6
      this.controls.maxPolarAngle = Math.PI/2.1
    }
  }

  setLens(lens) {
    let tween = new TWEEN.Tween(this.clippingPlane)
    switch(lens) {
      case "GROUND":
        this.switchControls(true)
        tween.to({ constant: 0.01 }, 100)
        break
      case "BASIC":
        this.switchControls(false)
        tween.to({ constant: 2.5 }, 200)
        break
      case "CROSS":
        this.switchControls(false)
        tween.to({ constant: 0.7 }, 200)
        break
      default:
        this.setClippingHeight(this.clippingHeight)
        break
    }
    tween.start()
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
    this.mouse.x = ( event.clientX / this.renderer.domElement.width ) * 2 - 1
    this.mouse.y = - ( event.clientY / this.renderer.domElement.height ) * 2 + 1
    this.raycaster.setFromCamera( this.mouse, this.refs.camera )

    this.balls.map( (b) => { b.material.color.setHex( 0x000000 ) })

    if (!this.dragDirection) {
      let movementX = Math.abs(this.previousX - event.clientX)
      let movementY = Math.abs(this.previousY - event.clientY)
      if (movementX > 4 || movementY > 4) {
        this.dragDirection = (movementX > movementY) ? 'Z' : 'Y';
        // console.log("DRAG", this.dragDirection)
      }
      this.previousX = event.clientX
      this.previousY = event.clientY
    }

    // if (this.dragDirection && this.SELECTED) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        if (this.SELECTED && this.dragDirection === 'Z') {
          this.SELECTED.position.z = this.offset.z//.sub(this.intersection).z
        }
      }
    // } else {

    //   let intersects = this.raycaster.intersectObjects(this.balls)
    //   if (intersects.length > 0) {
    //     if (this.INTERSECTED != intersects[0].object) {
    //       this.INTERSECTED = intersects[0].object
    //       this.INTERSECTED.selected = true
    //       // console.log(this.SELECTED)
    //       this.plane.setFromNormalAndCoplanarPoint(
    //         this.refs.camera.getWorldDirection(this.plane.normal),
    //         this.INTERSECTED.position)
    //     }
    //   } else {
    //     if ( this.INTERSECTED) { this.INTERSECTED.selected = false; }
    //     this.INTERSECTED = null;
    //   }
    // }
  }

  onMouseUp(event) {
    this.SELECTED = null
    this.controls.enabled = true
    this.dragDirection = null
    // this.MOUSE_STATE = "UP"
  }

  onMouseDown(event) {
    this.raycaster.setFromCamera(this.mouse, this.refs.camera)
    let intersects = this.raycaster.intersectObjects(this.balls)
    if (intersects.length > 0) {
      this.controls.enabled = false
      this.SELECTED = intersects[0].object
    }
    // this.MOUSE_STATE = "DOWN"
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera, document.getElementById('root'))
    controls.minPolarAngle = 0//Math.PI/6
    controls.maxPolarAngle = Math.PI/2.1
    controls.maxDistance = 9
    controls.minDistance = 4
    this.controls = controls

    this.stats = new Stats()
    // const container = document.getElementById('root')
    // container.appendChild(this.stats.domElement)

    window.addEventListener( 'resize', this.onWindowResize, false )
    document.addEventListener('mousedown', this.onMouseDown, false )
    document.addEventListener('mouseup', this.onMouseUp, false )
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

              <Balls store={this.props.store} ref="balls" addBall={this.addBall} />
              <Building setMesh={this.setMesh} store={this.props.store} />
              <GroundPlane store={this.props.store} />
              <Arrows store={this.props.store} />

          </scene>
        </React3>
        <HUD store={this.props.store} />
        <Controls store={this.props.store} clippingHeight={this.clippingHeight} setClippingHeight={this.setClippingHeight} ref='controls' />
        <LockedText />
        <LensButtons setLens={this.setLens} />
      </div>
    )
  }
}

class LockedText extends React.Component {
  render() {
    if (!window.location.hash.match('locked')) return false
    return(
      <div id='locked-text'>
        <img src="https://image.flaticon.com/icons/svg/44/44594.svg" role="presentation" />
        LOCKED
      </div>
    )
  }
}
