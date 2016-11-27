import React from 'react'
import { connect } from 'react-redux'
import { getCosts } from '../actions'
import { claddingColorSelector, bayCountSelector } from '../selectors/building'
import SVG, { SCALE } from '../libs/SVG'
import THREE from 'three'

class Building extends React.Component {

  componentWillMount() {
    this.props.getCosts()
  }

  render() {
    return (
      <Intermediate
        position={new THREE.Vector3(0,0,-this.props.length/2)}
        color={this.props.claddingColor}
        length={this.props.length}
        bayCount={this.props.bayCount}
        width={this.props.frameWidth}
        height={this.props.frameHeight} />
    )
  }

}

class Simple extends React.Component {
  render() {
    return (
      <mesh position={this.props.position}>
        <boxGeometry
          width={this.props.width}
          height={this.props.height}
          depth={this.props.length} />
        <meshBasicMaterial color={this.props.color} />
      </mesh>
    )
  }
}

class Intermediate extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path)
  }
  render() {
    return (
      <mesh position={this.props.position}>
        <extrudeGeometry amount={this.props.length} bevelEnabled={false} steps={parseInt(this.props.bayCount)*2}>
          <shape>{this.shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={this.props.color}
          wireframe={true}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  }
}

const mapStateToProps = (state) => ({
  length: state.building.length,
  frameWidth: state.frame.width,
  frameHeight: state.frame.height,
  claddingColor: claddingColorSelector(state),
  bayCount: bayCountSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getCosts: () => { dispatch(getCosts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Building)
