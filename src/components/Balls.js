import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux'

class Balls extends React.Component {
  render() {
    let balls = [
      <Ball addBall={this.props.addBall} key="front" position={new THREE.Vector3(0,this.props.height,this.props.length+0.1)} />,
      <Ball addBall={this.props.addBall} key="mid" position={new THREE.Vector3(0,this.props.height,0)} />
    ]
    return <group>{balls}</group>
  }
}

class Ball extends React.Component {

  constructor(props, state) {
    super(props, state)
    this.state = {
      selected: false
    }
    this.setSelected = this.setSelected.bind(this)
  }

  componentDidMount() {
    this.props.addBall(this.refs.mesh)
  }

  setSelected(bool) {
    this.setState({ selected: bool })
  }

  render() {
    return (
      <mesh ref="mesh" position={this.props.position}>
        <sphereGeometry radius={0.15} widthSegments={32} heightSegments={32} />
        <meshBasicMaterial color={this.state.selected ? 0xFF0000 : 0x000000} side={THREE.DoubleSide} />
      </mesh>
    )
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length/4,
  height: state.frame.height/2
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Balls)
