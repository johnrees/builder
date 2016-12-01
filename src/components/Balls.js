import React from 'react'
import THREE from 'three'
import { connect } from 'react-redux'

class Balls extends React.Component {
  render() {
    if (window.location.hash.match('locked')) return false
    let balls = [

      <Ball name='z'
        addBall={this.props.addBall}
        key="front"
        linePoint={new THREE.Vector3(0,0,5)}
        position={new THREE.Vector3(0,this.props.height,this.props.length)} />,

      <Ball name='y'
        addBall={this.props.addBall}
        key="mid"
        linePoint={new THREE.Vector3(0,5,0)}
        position={new THREE.Vector3(0,this.props.height,0)} />,

      <Ball name='x'
        addBall={this.props.addBall}
        key="back"
        linePoint={new THREE.Vector3(5,0,0)}
        position={new THREE.Vector3(this.props.width,this.props.height*0.6,-this.props.length)} />,
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
    this.props.addBall(this)
    this.refs.line.visible = false
  }

  setSelected(bool) {
    this.setState({ selected: bool })
  }

  render() {
    return (
      <group>
        <line ref="line">
          <geometry vertices={[this.props.linePoint.add(this.props.position), this.props.position]} />
          <meshBasicMaterial color={0x000000} />
        </line>
        <mesh ref="mesh" position={this.props.position} name={this.props.name}>
          <sphereGeometry radius={0.18} widthSegments={32} heightSegments={32} />
          <meshBasicMaterial color={this.state.selected ? 0x3CDB50 : 0x000000} side={THREE.DoubleSide} />
        </mesh>
      </group>
    )
  }

}

const mapStateToProps = (state) => ({
  length: state.building.length/4,
  height: state.frame.height/2,
  width: state.frame.width/4
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Balls)
