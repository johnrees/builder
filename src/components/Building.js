import React from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions'
import { bayCountSelector, claddingMaterialSelector, roofingMaterialSelector, frameSelector } from '../selectors/building'

import SVG, { SCALE } from '../libs/SVG'
import THREE from 'three'
// import FrameBox from './FrameBox'
import Door from './Door'
import InnerWall from './InnerWall'
import createFragment from 'react-addons-create-fragment'
import shallowequal from 'shallowequal'

class OptimisedComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !shallowequal(this.props, nextProps)
  }
}

class Building extends OptimisedComponent {
  componentWillMount() {
    this.props.getData()
  }

  render() {
    return (
      <group>
        <InnerWall
          position={new THREE.Vector3(0,0,0)}
          width={4}
          height={4}
          length={0.1}
          color={0xFF0000}
          />
        <Door
          position={new THREE.Vector3(0.1,0.45,-this.props.length/2-0.1)}
          width={0.8}
          height={0.8}
          length={0.04}
          color={0x000000}
          />
        <Door
          position={new THREE.Vector3(-0.1,0.45,this.props.length/2+0.1)}
          width={0.8}
          height={0.8}
          length={0.04}
          color={0x000000}
          />
        <FrameBoxes
          bayCount={this.props.bayCount} length={this.props.length} frameData={this.props.frameData} />
        <Faces
          path={this.props.frameSVG}
          setMesh={this.props.setMesh}
          claddingMaterial={this.props.claddingMaterial}
          roofingMaterial={this.props.roofingMaterial}
          bayCount={this.props.bayCount}
          length={this.props.length}
          />
        <Room
          roomPosition={this.props.roomPosition}
          path={this.props.frameSVG}
          bayCount={this.props.bayCount}
          hasRoom={this.props.hasRoom}
          length={this.props.length}
          />
      </group>
    )
  }
}

class Room extends OptimisedComponent {
  render() {
    if (!this.props.hasRoom) { return false }
    let length = this.props.length/this.props.bayCount
    let location = -this.props.length/2+(length * this.props.roomPosition )
    let shape = new SVG().transformSVGPath(this.props.path)

    return (
      <mesh position={new THREE.Vector3(0,0,location)}>
        <extrudeGeometry amount={length*2} bevelEnabled={false}>
          <shape>{shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={'red'}
          wireframe={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  }
}


class Faces extends OptimisedComponent {

  constructor(props, context) {
    super(props, context)
    this.doUpdates = this.doUpdates.bind(this)
  }

  componentDidMount() {
    this.group = this.refs.group
    this.doUpdates(this.props)
    // this.refs.material.clippingPlanes= [this.props.clippingPlane]
  }

  doUpdates(nextProps) {

    let geometry = new THREE.ExtrudeGeometry(this.shape, { amount: nextProps.length+0.2, bevelEnabled: false, steps: nextProps.bayCount})
    let materials = [
      nextProps.claddingMaterial,
      nextProps.roofingMaterial
      // new THREE.MeshLambertMaterial({ color: nextProps.roofingColor, side: THREE.DoubleSide })
    ]
    for( var i = 0; i < geometry.faces.length; i++ ) {
      geometry.faces[i].materialIndex = geometry.faces[i].normal.y > 0 ? 1 : 0
    }
    // geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
    let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
    mesh.castShadow = true
    // mesh.receiveShadow = true
    mesh.position.setZ( -(nextProps.length+0.2)/2)
    this.group.children[0] = mesh
    nextProps.setMesh(mesh)
  }

  componentWillReceiveProps(nextProps) {
    // must use nextProps to make edits prior to render
    this.doUpdates(nextProps)
  }

  render() {
    // var path = 'M0,400l150,-200l0,-200l-300,0l0,200z'
    this.shape = new SVG().transformSVGPath(this.props.path, false)
    return (<object3D ref='group' />)
  }
}

class FrameBoxes extends OptimisedComponent {
  componentDidMount() {
  }
  render() {
    // if (!window.showFrames) return false

    this.frameboxes = []
    for (var i = 0; i <= this.props.bayCount; i++) {
      let position = (this.props.length/this.props.bayCount) * i - this.props.length/2
      this.frameboxes.push(<FrameBox position={position} key={i} frameData={this.props.frameData} />)
    }
    return (<group>{this.frameboxes}</group>)
  }
}


class FrameBox extends OptimisedComponent {
  constructor(props,state) {
    super(props,state)
  }

  componentDidMount() {
    console.log("THING", this.props.frameData)
  }

  render() {
    // console.log("FRAMEBOX")
    this.frames = createFragment({
      left: <Frame position={-0.05} frameData={this.props.frameData}/>,
      right: <Frame position={0.05} frameData={this.props.frameData}/>
    })
    return (
      <object3D position={new THREE.Vector3(0,0,this.props.position)}>{this.frames}</object3D>
    )
  }
}

class Frame extends OptimisedComponent {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    return(
      <group>
        { this.props.frameData.map( (path, index) => <FrameSegment path={path} position={this.props.position} key={index} />)}
      </group>
    )
  }
}

class FrameSegment extends OptimisedComponent {
  constructor(props, context) {
    super(props, context)
  }
  componentWillUpdate() {
    this.refs.mesh.visible=true;
  }
  render() {
    var path = this.props.path
    this.shape = new SVG().transformSVGPath(path)
    // console.log("FRAME SEGMENT")
    // 0xdfd3c6
    return(
      <mesh position={new THREE.Vector3(0,0,this.props.position)} ref="mesh">
        <extrudeGeometry amount={4*SCALE} bevelEnabled={false}>
          <shape>{this.shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={'white'}
          wireframe={false}
        />
      </mesh>
    )
  }
}


const mapStateToProps = (state) => ({
  length: state.building.length/2,
  frameWidth: state.frame.width,
  frameHeight: state.frame.height,
  claddingMaterial: claddingMaterialSelector(state),
  roofingMaterial: roofingMaterialSelector(state),
  bayCount: bayCountSelector(state),
  frameSVG: frameSelector(state),
  hasRoom: state.building.hasRoom,
  roomPosition: state.building.roomPosition,
  frameData: state.frame.data
  // claddingColor: claddingColorSelector(state),
  // roofingColor: roofingColorSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getData: () => { dispatch(getData()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
