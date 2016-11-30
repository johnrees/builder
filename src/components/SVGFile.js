import React from 'react'
import {outer} from '../blueprint'

export default class SVGFile extends React.Component {
  render() {
    let paths = <path d={outer(6,4)} />
    // <?xml version="1.0" encoding="utf-8"?>
    return(
      <svg width="120cm" height="240cm" xmlns="http://www.w3.org/2000/svg" style={{stroke:'black', fill:'none'}}>
        <g transform="scale(35.43307)">{paths}</g>
      </svg>
    )
  }
}
