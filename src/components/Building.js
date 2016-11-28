import React from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions'
import { bayCountSelector, claddingMaterialSelector, roofingMaterialSelector, frameSelector } from '../selectors/building'
import SVG from '../libs/SVG'
import THREE from 'three'
import FrameBox from './FrameBox'

class Building extends React.Component {
  componentWillMount() {
    // setTimeout(() => {this.props.getData()}, 10)
    this.props.getData()
  }

  render() {
    return (
      <group>
        <FrameBoxes bayCount={this.props.bayCount} length={this.props.length} />
        <Faces
          path={this.props.frameSVG}
          setMesh={this.props.setMesh}
          claddingMaterial={this.props.claddingMaterial}
          roofingMaterial={this.props.roofingMaterial}
          bayCount={this.props.bayCount}
          length={this.props.length} />
      </group>
    )
  }
}

class Faces extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.doUpdates = this.doUpdates.bind(this)
  }

  componentDidMount() {
    this.group = this.refs.group
    this.doUpdates(this.props)
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
    var path = 'M0,400l150,-200l0,-200l-300,0l0,200z'
    this.shape = new SVG().transformSVGPath(this.props.path, false)
    return (<object3D ref='group' />)
  }
}

class FrameBoxes extends React.Component {
  render() {
    this.frameboxes = []
    for (var i = 0; i <= this.props.bayCount; i++) {
      let position = (this.props.length / this.props.bayCount) * i - this.props.length/2
      this.frameboxes.push(<FrameBox position={position} key={i} />)
    }
    return (<group>{this.frameboxes}</group>)
  }
}


const mapStateToProps = (state) => ({
  length: state.building.length,
  frameWidth: state.frame.width,
  frameHeight: state.frame.height,
  claddingMaterial: claddingMaterialSelector(state),
  roofingMaterial: roofingMaterialSelector(state),
  bayCount: bayCountSelector(state),
  frameSVG: frameSelector(state)
  // claddingColor: claddingColorSelector(state),
  // roofingColor: roofingColorSelector(state),
})

const mapDispatchToProps = (dispatch) => ({
  getData: () => { dispatch(getData()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
