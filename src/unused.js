
class Faces extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path, false)
  }
  componentDidMount() {
    const group = this.refs.group
    let geometry = new THREE.ExtrudeGeometry(this.shape, { amount: 5, bevelEnabled: false, steps: 5})
    let materials = [
      new THREE.MeshBasicMaterial( { color: 0x949494, side: THREE.DoubleSide } ),
      new THREE.MeshBasicMaterial( { color: 0x474747, side: THREE.DoubleSide } )
    ]
    for( var i = 0; i < geometry.faces.length; i++ ) {
      console.log(geometry.faces[i])
      // geometry.faces[i].materialIndex = THREE.Math.randInt(0, 1)
      geometry.faces[i].materialIndex = geometry.faces[i].normal.y > 0 ? 1 : 0
    }
    geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
    let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
    group.add(mesh)
    this.props.setMesh(mesh)
  }
  componentDidUpdate() {
    // console.log(this.refs.geom)
  }
  render() {
    return (<group ref='group' />)
  }
}

// class Faces extends React.Component {
//   componentDidMount() {
//     const group = this.refs.group
//     let geometry = new THREE.BoxGeometry( 2, 2, 2, 4, 4, 4 )
//     let materials = [
//       new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide } ),
//       new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } )
//     ]
//     for( var i = 0; i < geometry.faces.length; i++ ) {
//       geometry.faces[ i ].materialIndex = THREE.Math.randInt(0, 1)
//     }
//     geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
//     let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
//     group.add(mesh)
//   }
//   componentDidUpdate() {
//     // console.log(this.refs.geom)
//   }
//   render() {
//     return (<group ref='group' />)
//   }
// }


class Intermediate extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path)
  }
  componentDidMount() {
    this.props.setMesh(this.refs.mesh)
  }
  componentDidUpdate() {
    // console.log(this.refs.geom)
  }
  render() {
    return (
      <mesh position={this.props.position} ref='mesh'>
        <extrudeGeometry ref='geom' amount={this.props.length} bevelEnabled={false} steps={parseInt(this.props.bayCount)}>
          <shape>{this.shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={this.props.color}
          wireframe={true}
          side={THREE.DoubleSide} />
      </mesh>
    )
  }
}



----------





// class Faces extends React.Component {
//   componentDidMount() {
//     const group = this.refs.group
//     let geometry = new THREE.BoxGeometry( 2, 2, 2, 4, 4, 4 )
//     let materials = [
//       new THREE.MeshLambertMaterial( { color: 0xffff00, side: THREE.DoubleSide } ),
//       new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } )
//     ]
//     for( var i = 0; i < geometry.faces.length; i++ ) {
//       geometry.faces[ i ].materialIndex = THREE.Math.randInt(0, 1)
//     }
//     geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
//     let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
//     group.add(mesh)
//   }
//   componentDidUpdate() {
//     // console.log(this.refs.geom)
//   }
//   render() {
//     return (<group ref='group' />)
//   }
// }


class Intermediate extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path)
  }
  componentDidMount() {
    this.props.setMesh(this.refs.mesh)
  }
  componentDidUpdate() {
    // console.log(this.refs.geom)
  }
  render() {
    return (
      <mesh position={this.props.position} ref='mesh'>
        <extrudeGeometry ref='geom' amount={this.props.length} bevelEnabled={false} steps={parseInt(this.props.bayCount)}>
          <shape>{this.shape}</shape>
        </extrudeGeometry>
        <meshBasicMaterial
          color={this.props.color}
          wireframe={true}
          side={THREE.DoubleSide} />
      </mesh>
    )
  }
}

class Faces extends React.Component {
  constructor(props, context) {
    super(props, context)
    var path = 'M0,411l-212,-163l0,-265l424,0l0,265z'
    this.shape = new SVG().transformSVGPath(path, false)
  }
  componentDidMount() {
    const group = this.refs.group
    let geometry = new THREE.ExtrudeGeometry(this.shape, { amount: this.props.length, bevelEnabled: false, steps: this.props.bayCount})
    let materials = [
      new THREE.MeshBasicMaterial( { color: this.props.claddingColor, side: THREE.DoubleSide } ),
      new THREE.MeshBasicMaterial( { color: this.props.roofingColor, side: THREE.DoubleSide } )
    ]
    for( var i = 0; i < geometry.faces.length; i++ ) {
      console.log(geometry.faces[i])
      // geometry.faces[i].materialIndex = THREE.Math.randInt(0, 1)
      geometry.faces[i].materialIndex = geometry.faces[i].normal.y > 0 ? 1 : 0
    }
    geometry.sortFacesByMaterialIndex() // optional, to reduce draw calls
    let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials))
    mesh.position.setZ(-this.props.length/2)
    group.add(mesh)
    this.props.setMesh(mesh)
  }
  componentDidUpdate() {
    // console.log(this.refs.geom)
  }
  render() {
    return (<group ref='group' />)
  }
}


        <FrameBoxes bayCount={this.props.bayCount} length={this.props.length} />
        <Intermediate
          setMesh={this.props.setMesh}
          position={new THREE.Vector3(0,0,-this.props.length/2)}
          color={this.props.claddingColor}
          length={this.props.length}
          bayCount={this.props.bayCount}
          width={this.props.frameWidth}
          height={this.props.frameHeight} />