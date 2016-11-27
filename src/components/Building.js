import React from 'react'

export default class Building extends React.Component {

  render() {
    return (
      <mesh>
        <boxGeometry
          width={1}
          height={1}
          depth={1} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    )
  }

}
