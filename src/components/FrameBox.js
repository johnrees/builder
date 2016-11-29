import React from 'react'
import THREE from 'three'
import SVG, { SCALE } from '../libs/SVG'
import createFragment from 'react-addons-create-fragment'
// import shallowequal from 'shallowequal'
// class OptimisedComponent extends React.Component {
//   shouldComponentUpdate(nextProps) {
//     return !shallowequal(this.props, nextProps)
//   }
// }

export default class FrameBox extends React.Component {
  constructor(props,state) {
    super(props,state)
    this.frames = createFragment({
      left: <Frame position={-0.05} />,
      right: <Frame position={0.05} />
    })
  }

  render() {
    // console.log("FRAMEBOX")
    return (
      <object3D position={new THREE.Vector3(0,0,this.props.position)}>{this.frames}</object3D>
    )
  }
}

class Frame extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.paths = []
    this.paths.push("M128.93599,275.65587l14.65408,19.0503l-4.67608,3.59177l2.43146,3.1609l-15.85248,12.19422l-2.44001,-3.17201l-10.31692,7.92459l2.44556,3.17923l-15.85248,12.19422l-2.45411,-3.19034l-10.31692,7.92459l2.45967,3.19757l-15.85248,12.19422l-2.46821,-3.20868l-3.25443,2.49978l-14.5667,-18.93671l3.2507,-2.50464l-2.4721,-3.21373l15.85248,-12.19422l2.46244,3.20117l10.30508,-7.93998l-2.45616,-3.19301l15.85248,-12.19422l2.44651,3.18046l10.30508,-7.93998l-2.44023,-3.17229l15.85248,-12.19422l2.43057,3.15974z")
    this.paths.push("M183,164.5l24,0l0,5.5l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,26l-20.50293,15.74863l2.40582,3.12757l-15.85248,12.19422l-2.41437,-3.13868l-7.93051,6.09155l2.41864,3.14423l-15.85248,12.19422l-2.42719,-3.15534l-3.25443,2.49978l-14.65408,-19.0503l3.2507,-2.50464l-2.42574,-3.15347l15.85248,-12.19422l2.41609,3.14092l7.92141,-6.10338l-2.41126,-3.13464l15.85248,-12.19422l2.40161,3.12209l11.20625,-8.63432l0,-14l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0z")
    this.paths.push("M183,74.5l24,0l0,5.5l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,4.5l-24,0l0,-4.5l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0z")
    this.paths.push("M120,12l0,-24l5,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l32,0l0,32l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,4.5l-24,0l0,-4.5l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-8l-8,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4z")
    this.paths.push("M-120,12l0,-24l5,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l5,0l0,24l-5,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4z")
    this.paths.push("M-183,75.5l-24,0l0,-5.5l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-32l32,0l0,-4l20,0l0,4l10,0l0,-4l20,0l0,4l5,0l0,24l-5,0l0,4l-20,0l0,-4l-10,0l0,4l-20,0l0,-4l-8,0l0,8l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0z")
    this.paths.push("M-183,165.5l-24,0l0,-5.5l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-4.5l24,0l0,4.5l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0z")
    this.paths.push("M-127.51598,276.74998l-14.65245,19.04818l-4.67608,-3.59177l-2.42719,3.15534l-15.85248,-12.19422l2.41864,-3.14423l-7.93051,-6.09155l-2.41437,3.13868l-15.85248,-12.19422l2.40582,-3.12757l-20.50293,-15.74863l0,-26l-4,0l0,-20l4,0l0,-10l-4,0l0,-20l4,0l0,-4.5l24,0l0,4.5l4,0l0,20l-4,0l0,10l4,0l0,20l-4,0l0,14l11.20625,8.63432l2.40161,-3.12209l15.85248,12.19422l-2.41126,3.13464l7.92141,6.10338l2.41609,-3.14092l15.85248,12.19422l-2.42574,3.15347z")
    this.paths.push("M-51.45593,335.35363l-14.56507,18.93459l-4.67608,-3.59177l-2.46821,3.20868l-15.85248,-12.19422l2.45967,-3.19757l-10.31692,-7.92459l-2.45411,3.19034l-15.85248,-12.19422l2.44556,-3.17923l-10.31692,-7.92459l-2.44001,3.17201l-15.85248,-12.19422l2.43146,-3.1609l-3.25443,-2.49978l14.65245,-19.04818l3.2507,2.50464l2.43057,-3.15974l15.85248,12.19422l-2.44023,3.17229l10.30508,7.93998l2.44651,-3.18046l15.85248,12.19422l-2.45616,3.19301l10.30508,7.93998l2.46244,-3.20117l15.85248,12.19422l-2.4721,3.21373z")
    this.paths.push("M52.87594,334.25952l14.5667,18.93671l-4.67608,3.59177l2.47249,3.21423l-15.85248,12.19422l-2.48103,-3.22534l-7.93051,6.09155l2.4853,3.23089l-15.85248,12.19422l-2.49385,-3.242l-23.114,17.75423l-23.114,-17.75423l-2.49385,3.242l-15.85248,-12.19422l2.4853,-3.23089l-7.93051,-6.09155l-2.48103,3.22534l-15.85248,-12.19422l2.47249,-3.21423l-3.25443,-2.49978l14.56507,-18.93459l3.2507,2.50464l2.47692,-3.22l15.85248,12.19422l-2.48658,3.23255l7.92141,6.10338l2.49141,-3.23883l15.85248,12.19422l-2.50106,3.25138l8.59817,6.62482l8.59817,-6.62482l-2.50106,-3.25138l15.85248,-12.19422l2.49141,3.23883l7.92141,-6.10338l-2.48658,-3.23255l15.85248,-12.19422l2.47692,3.22z")
  }

  // shouldComponentUpdate(nextProps) {
  //   // console.log("SHOULD UPDATE?")
  //   // console.log(this.props, nextProps)
  //   return !shallowequal(this.props, nextProps)
  // }

  render() {
    // console.log("FRAME")
    return(
      <group>
        { this.paths.map( (path, index) => <FrameSegment path={path} position={this.props.position} key={index} />)}
      </group>
    )
  }
}

class FrameSegment extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = this.props.path
    this.shape = new SVG().transformSVGPath(path)
  }
  render() {
    // console.log("FRAME SEGMENT")
    // 0xdfd3c6
    return(
      <mesh position={new THREE.Vector3(0,0,this.props.position)}>
        <extrudeGeometry amount={4*SCALE} bevelEnabled={false}>
          <shape>{this.shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={'yellow'}
          wireframe={false}
        />
      </mesh>
    )
  }
}
