import React from 'react'
import { connect } from 'react-redux'
import { getCosts } from '../actions'
import { claddingColorSelector, roofingColorSelector, bayCountSelector } from '../selectors/building'
import SVG from '../libs/SVG'
import THREE from 'three'
import FrameBox from './FrameBox'

class Building extends React.Component {
  componentWillMount() {
    this.props.getCosts()
  }

  render() {
    return (
      <group>
        <Faces
          setMesh={this.props.setMesh}
          claddingColor={this.props.claddingColor}
          roofingColor={this.props.roofingColor}
          bayCount={this.props.bayCount}
          length={this.props.length} />
      </group>
    )
  }
}

class Faces extends React.Component {

  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path, false)
    this.doUpdates = this.doUpdates.bind(this)
  }

  componentWillUnmount() {
    console.log('UNMOUNT')
  }

  componentDidMount() {
    console.log('MOUNTED')
    this.group = this.refs.group
    this.doUpdates(this.props)
  }

  doUpdates(nextProps) {
    let geometry = new THREE.ExtrudeGeometry(this.shape, { amount: nextProps.length, bevelEnabled: false, steps: nextProps.bayCount})
    let materials = [
      new THREE.MeshBasicMaterial({ color: nextProps.claddingColor, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: nextProps.roofingColor, side: THREE.DoubleSide })
    ]
    for( var i = 0; i < geometry.faces.length; i++ ) {
      geometry.faces[i].materialIndex = geometry.faces[i].normal.y > 0 ? 1 : 0
    }
    // geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
    let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
    mesh.position.setZ(-nextProps.length/2)
    this.group.children[0] = mesh
    nextProps.setMesh(mesh)
  }

  componentWillReceiveProps(nextProps) {
    // must use nextProps to make edits prior to render
    this.doUpdates(nextProps)
  }

  render() {
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
  claddingColor: claddingColorSelector(state),
  roofingColor: roofingColorSelector(state),
  bayCount: bayCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getCosts: () => { dispatch(getCosts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
